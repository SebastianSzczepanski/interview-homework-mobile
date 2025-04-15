# To the reviewer 👋:

Thanks for taking the time to review my task! I just wanted to clarify a few things that might come up during the review — I’ll try to summarize everything here.

The app consists of four screens: a product list, a cart, a product details view, and a screen for adding products to the warehouse. I used Redux with RTK Query as the state manager. While this might seem like a heavy choice for such a small app, the task mentioned that the solution should be scalable — and this setup definitely supports that.

I assumed the product list could get pretty long, so I implemented pagination on the frontend, assuming the backend would support it too.

Another assumption was that the product would have a separate endpoint returning detailed data. On the product details screen, I simulate an API request, even though I technically already have all the data from the list view. But in a real-world scenario, calling a dedicated endpoint would probably be necessary.

To mock API responses, I used Faker.js — that’s why you’ll notice different data when selecting a product on the list vs. viewing it on the details screen. This is because the details view fetches data from a different endpoint, and unfortunately, I don’t have a way to keep the mocked data consistent across both.

The project already included predefined styles, so I assumed you wanted to keep them as-is. In a real production app, I’d prefer to use a styling library like Unistyles, or even a component library like Tamagui or Gluestack.

To run the tests, use:

 ```bash
 npm run test
   ```

To run the app:
First, install the new dependencies

 ```bash
 npm ci
   ```

Then start the app:

 ```bash
npm run ios
or
npm run android
   ```

If you have any questions, I’d be happy to answer them.
Enjoy the review!

# React Native application for Warehouse

This repository serves as the scaffold of the application that is a part of the interview process for candidates attending on the position in CloudTalk.

## Assignment

1. As a warehouse, we would like to have two main features

	1. Warehouse status

		1. Table of products that are available
		2. Product definition (required properties)

			1. ID
			2. Name
			3. Quantity
			4. Unit price (euros)

		3. Product manipulation

			1. CRUD operations

	2. Shipments (optional)

2. The application should be prepared to use the REST API

	1. In case of Fullstack position, the API should be implemented

3. Please at the development consider

	1. Best practices for the development of React Native application
	2. Testing
	3. Simulate a situation in which you work with the team (pay attention to how you work with Git)

4. This is a bare minimum, there are no limits to creativity, just keep in mind what we wanted

We wish you good luck and a clear mind! We are looking forward to seeing you!

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
