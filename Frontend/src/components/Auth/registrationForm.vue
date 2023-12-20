<template>
  <v-form v-model="valid" @submit.prevent="handleSubmit">
    <h1>Register a new user</h1>
    <p>Enter your information to create your account.</p>
    <v-container>
      <v-row>
        <!-- First Name -->
        <v-col cols="12" md="4">
          <v-text-field
            v-model="firstName"
            :rules="firstNameRules"
            :counter="10"
            label="First name"
            required
            hide-details
            @input="clearValidationError('firstName')"
          ></v-text-field>
          <span v-if="validationErrors.firstName" class="error-message">{{ validationErrors.firstName }}</span>
        </v-col>
        <!-- Last name -->
        <v-col cols="12" md="4">
          <v-text-field
            v-model="lastName"
            :rules="lastNameRules"
            :counter="10"
            label="Last name"
            required
            hide-details
            @input="clearValidationError('lastName')"
          ></v-text-field>
          <span v-if="validationErrors.lastName" class="error-message">{{ validationErrors.lastName }}</span>
        </v-col>
        <!-- Email -->
        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            hide-details
            @input="clearValidationError('email')"
          ></v-text-field>
          <span v-if="validationErrors.email" class="error-message">{{ validationErrors.email }}</span>
        </v-col>
        <!-- Password -->
        <v-col cols="12" md="4">
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
            hide-details
            @input="clearValidationError('password')"
          ></v-text-field>
          <span v-if="validationErrors.password" class="error-message">{{ validationErrors.password }}</span>
        </v-col>
        <!-- Confirm Password -->
        <v-col cols="12" md="4">
          <v-text-field
            v-model="confirmPassword"
            :rules="confirmPasswordRules"
            label="Confirm password"
            type="password"
            required
            hide-details
            @input="clearValidationError('confirmPassword')"
          ></v-text-field>
          <span v-if="!isPasswordMatch" class="error-message">Passwords must match</span>
        </v-col>
        <v-btn type="submit" :disabled="!valid" block class="mt-2">Register</v-btn>
      </v-row>
    </v-container>
    <span v-if="submissionMessage" class="success-message">{{ submissionMessage }}</span>
  </v-form>
</template>

<script lang="ts">
import { z } from 'zod';
import apiService from '../../API/apiService';

function createFormSchema() {
  return z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string(),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
}

interface RegistrationFormData {
  valid: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  formSchema: ReturnType<typeof createFormSchema> | null;
  firstNameRules: ((v: string) => boolean | string)[];
  lastNameRules: ((v: string) => boolean | string)[];
  emailRules: ((v: string) => boolean | string)[];
  passwordRules: ((v: string) => boolean | string)[];
  confirmPasswordRules: ((v: string) => boolean | string)[];
  validationErrors: Record<string, string>;
  submissionMessage: string;
}

interface ZodError {
  formErrors: {
    fieldErrors: Record<string, string[]>;
  };
}

interface ValidationErrors {
  [key: string]: string;
}

export default {
  data(): RegistrationFormData {
    return {
      valid: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      formSchema: null,
      firstNameRules: [
        (v: string) => !!v || 'First name is required',
        (v: string) => v.length <= 10 || 'First name must be less than 10 characters'
      ],
      lastNameRules: [
        (v: string) => !!v || 'Last name is required',
        (v: string) => v.length <= 10 || 'Last name must be less than 10 characters'
      ],
      emailRules: [
        (v: string) => !!v || 'E-mail is required',
        (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        (v: string) => !!v || 'Password is required',
        (v: string) => v.length >= 6 || 'Password must be at least 6 characters',
        (v: string) => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
        (v: string) => /[a-z]/.test(v) || 'Password must contain at least one lowercase letter',
        (v: string) => /[0-9]/.test(v) || 'Password must contain at least one number',
        (v: string) => /[\!\@\#\$\%\^\&\*]/.test(v) || 'Password must contain at least one special character (!@#$%^&*)'
      ],
      confirmPasswordRules: [
        (v: string) => !!v || 'Confirm password is required',
      ],
      validationErrors: {},
      submissionMessage: '',
    };
  },
  created() {
    this.formSchema = createFormSchema();
  },
  computed: {
    isPasswordMatch() {
      return this.password === this.confirmPassword;
    }
  },
  methods: {
    async handleSubmit() {
      console.log("Form submission started with data:", this.firstName, this.lastName, this.email, this.password, this.confirmPassword);
      const formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      };

      if (this.formSchema) {
    const validationResult = this.formSchema.safeParse(formData);
    if (!validationResult.success) {
      console.log("Validation failed with errors:", validationResult.error);
      this.validationErrors = this.formatZodErrors(validationResult.error);
      this.submissionMessage = '';
      return;
    }
  } else {
    console.error("Form schema is not initialized");
    // Handle the case where formSchema is null, e.g., set an error message
    this.submissionMessage = 'Form schema is not initialized. Cannot validate form.';
    return;
  }


      const validationResult = this.formSchema.safeParse(formData);
      if (!validationResult.success) {
        console.log("Validation failed with errors:", validationResult.error);
        this.validationErrors = this.formatZodErrors(validationResult.error);
        this.submissionMessage = '';
        return;
      }

      try {
        const response = await apiService.createUser(formData);
        if (response.status === 200 || response.status === 201) {
          this.submissionMessage = 'Registration successful!';
          this.$router.push('/homePage');
        } else {
          throw new Error(`Failed to register user: Status code ${response.status}`);
        }
      } catch (error) {
        console.error("Error submitting form", error);
        this.submissionMessage = 'Registration failed. Please try again.';
      }
    },
    formatZodErrors(zodError: ZodError) {
      const formattedErrors: ValidationErrors = {};
      if (zodError.formErrors && zodError.formErrors.fieldErrors) {
        for (const [key, value] of Object.entries(zodError.formErrors.fieldErrors)) {
          formattedErrors[key] = value.join(', ');
        }
      }
      return formattedErrors;
    },
    clearValidationError(field: string): void {
      this.validationErrors[field] = '';
    },
  },
};
</script>

<style>
.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
}
.success-message {
  color: green;
  font-size: 0.8rem;
  margin-top: 5px;
}
</style>
