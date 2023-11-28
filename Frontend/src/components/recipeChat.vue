<template>
  <v-app>
    <navigation-bar/>
    <v-main> 
      <v-container fluid>
        <!-- Main Chat Area -->
        <v-row>
          <v-col cols="12" md="8">
            <v-card outlined class="chat-messages" style="max-height: 500px; overflow-y: auto;">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Welcome to Recipe Chat!</v-list-item-title>
                    <v-list-item-subtitle>Today, we're making a Classic Apple Pie. Here's the step-by-step guide:</v-list-item-subtitle>
                    <v-list-item-subtitle>1. Preheat your oven to 175°C (350°F).</v-list-item-subtitle>
                    <v-list-item-subtitle>2. Peel and slice 5 apples.</v-list-item-subtitle>
                    <v-list-item-subtitle>3. In a mixing bowl, combine the apple slices with 100g of sugar and 1 tsp of cinnamon. Toss to coat the apples evenly.</v-list-item-subtitle>
                    <v-list-item-subtitle>4. Roll out your pastry dough and line a pie dish with one of the rolled-out doughs.</v-list-item-subtitle>
                    <v-list-item-subtitle>5. Pour the apple mixture into the pie dish.</v-list-item-subtitle>
                    <v-list-item-subtitle>6. Cover the pie with the second rolled-out dough. Seal the edges and cut small slits in the top.</v-list-item-subtitle>
                    <v-list-item-subtitle>7. Brush the top of the pie with a beaten egg and sprinkle a little sugar.</v-list-item-subtitle>
                    <v-list-item-subtitle>8. Bake for 50 minutes or until the crust is golden brown.</v-list-item-subtitle>
                    <v-list-item-subtitle>9. Let the pie cool before serving. Enjoy your delicious homemade apple pie!</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <!-- Ingredients Section -->
            <v-card outlined class="pa-3">
              <v-card-title>Ingredients</v-card-title>
              <v-list>
                <v-list-item>
                  <v-list-item-content>Apples - 5</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Sugar - 100g</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Cinnamon - 1 tsp</v-list-item-content>
                </v-list-item>
                <!-- Add more ingredients as needed -->
              </v-list>
            </v-card>
            <!-- Chat Input Box -->
            <v-card flat>
              <v-text-field label="Type your message..." outlined dense full-width></v-text-field>
              <v-btn icon color="primary">
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
@media (max-width: 600px) {
  .chat-messages {
    max-height: 300px;
  }
}
</style>
