<template>
    <v-form v-model="valid" @submit="handleSubmit">
        <h1>Register a new user</h1>
        <p>Enter your information to create your account.</p>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="4" 
            >     
            <!-- First Name -->
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              :counter="10"
              label="First name"
              required
              hide-details
            ></v-text-field>
          </v-col>
          <!-- Last name -->
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="Last name"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <!-- Email -->
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              hide-details
              required
            ></v-text-field>
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
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
                v-model="confirmPassword"
                :rules="passwordRules"
                label=" Confirm password"
                type="password"
                required
                hide-details
            ></v-text-field>
          </v-col>
          <v-btn type="submit" :disabled="!valid" block class="mt-2">Register</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </template>

<script lang="ts">
  import  { defineComponent } from 'vue';
  import { z } from 'zod';

  const formSchema = z.object({
    firstName: z.string().min(1, { message: 'Name is required.' }),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string()
      .min(6)
      .regex(/^(?=.*[!@#$%^&*])/, {
         message:
            'Password must contain at least one special character (!@#$%^&*).',
      }),
    confirmPassword: z.string()
  }).refine(
    data => data.password === data.confirmPassword,
    { message: 'Passwords do not match.', path: ['confirmPassword'] } 
  )

  export default defineComponent ({
    data: () => ({
      valid: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      submissionMessage: '', 
    }),
    methods: {
      async handleSubmit() {
        const formData = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword
        };

        const validationResult= formSchema.safeParse(formData);

        if (!validationResult.success) {
            this.submissionMessage = "Validation failed. Please correct the errors.";
            console.error("Validation errors", validationResult.error);
        }

        try {
            const response = await axios.post('API-ENDPOINT', formData);
            this.submissionMessage = 'Registration successfull!';
        } catch (error) {
            console.error("Error submitting form", error);
            this.submissionMessage = 'Registration failed. Please try again.';
        }
    }  
  }
  });
</script> 

<style>

</style>