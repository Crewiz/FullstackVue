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
          <span v-if="validationErrors.confirmPassword" class="error-message">{{ validationErrors.confirmPassword }}</span>
        </v-col>
        <v-btn type="submit" :disabled="!valid" block class="mt-2">Register</v-btn>
      </v-row>
    </v-container>
    <span v-if="submissionMessage" class="success-message">{{ submissionMessage }}</span>
  </v-form>
</template>

<script lang="ts">
import { z } from 'zod';
import apiService from '../API/apiService'

export default {
  data() {
    return {
      valid: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstNameRules: [
        v => !!v || 'First name is required',
        v => v.length <= 10 || 'First name must be less than 10 characters'
      ],
      lastNameRules: [
        v => !!v || 'Last name is required',
        v => v.length <= 10 || 'Last name must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters',
        v => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
        v => /[a-z]/.test(v) || 'Password must contain at least one lowercase letter',
        v => /[0-9]/.test(v) || 'Password must contain at least one number',
        v => /[\!\@\#\$\%\^\&\*]/.test(v) || 'Password must contain at least one special character (!@#$%^&*)'
      ],
      confirmPasswordRules: [
        v => !!v || 'Confirm password is required',
        v => v === this.password || 'Passwords must match'
      ],
      validationErrors: {},
      submissionMessage: '', 
    };
  },
  created() {
    this.formSchema = z.object({
      firstName: z.string().min(1, 'First name is required'),
      lastName: z.string().min(1, 'Last name is required'),
      email: z.string().email('Invalid email format'),
      password: z.string().min(6, 'Password must be at least 6 characters long'),
      confirmPassword: z.string(),
    }).refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });
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

      // Validate formData against the Zod schema
      const validationResult = this.formSchema.safeParse(formData);

      // Check if validation was successful
      if (!validationResult.success) {
        console.log("Validation failed with errors:", this.validationErrors);
        // Format and store validation errors for displaying to the user
        this.validationErrors = this.formatZodErrors(validationResult.error);
        this.submissionMessage = ''; // Clear success message
        return; // Stop the submission process if validation fails
      }

      // If validation passes, proceed with submitting the form data
      try {
    const response = await apiService.createUser(formData);

    // If the request was processed successfully
    if (response.status === 200 || response.status === 201) {
      this.submissionMessage = 'Registration successful!';
    } else {
      // Handle other status codes appropriately
      throw new Error(`Failed to register user: Status code ${response.status}`);
    }
  } catch (error) {
    console.error("Error submitting form", error);
    this.submissionMessage = 'Registration failed. Please try again.';
  }
},


    // Utility method to format Zod errors
    formatZodErrors(zodError) {
      const formattedErrors = {};
      if (zodError.formErrors && zodError.formErrors.fieldErrors) {
        for (const [key, value] of Object.entries(zodError.formErrors.fieldErrors)) {
          formattedErrors[key] = value.join(', ');
        }
      }
      return formattedErrors;
    },

    clearValidationError(field) {
      this.validationErrors[field] = ''; // Clear the error message
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
