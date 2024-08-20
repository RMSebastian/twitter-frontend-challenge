# Twitter Training

This training project consists of taking a real project and adding, fixing, or improving some of its existing features. You will need to connect it with your Twitter backend service.

## Challenges

### Integration with your own Backend

If you check HttpRequestService, you will see that the url of the Backend is `process.env.REACT_APP_API_URL`.

Make the App point to your backend url (typically http://localhost:8080)

**Did you think this was that easy?**

You will probably have some errors in the app due to your Backend not returning exactly what the Frontend expects.

As we advance, be prepared to solve these errors as they appear.

✅DONE✅### Protected Routes

The objective of this feature is to add logic to protect certain routes that require an authenticated user to function. The following routes should be accessible to authenticated users:

- **Route**: `/`
  - **Component**: HomePage
- **Route**: `/recommendations`
  - **Component**: RecommendationPage
- **Route**: `/profile/:id`
  - **Component**: ProfilePage
- **Route**: `/post/:id`
  - **Component**: PostPage
- **Route**: `/compose/tweet`
  - **Component**: TweetPage
- **Route**: `/post/:id`
  - **Component**: CommentPage

**Why is it important?** We are sure that you will be working on a similar feature in your next project! The main reason for this is to prevent some users from accessing private routes or pages that contain sensitive data.

✅DONE✅### Transform Javascript components to Typescript components

The objective of this task is to read and understand how some components work and transform them into Typescript. Remember that you can type almost everything.

The next component needs the proper changes:

- **Component**: components/tweet-box/TweetBox.jsx

**Why is it important?** In this company, the majority of the projects use React + Typescript. That's why you must be a Master Jedi with the art of Typescript. Additionally, some frameworks like Next.js strongly recommend the utilization of Typescript as a means to mitigate errors and enhance the comprehensibility of components.

✅DONE✅### Transform Class Components to Functional Components

The objective of this task is to read and comprehend how class components function. You need to understand the component lifecycle and then transform them into functional components using TypeScript. In order to complete this task, you have to apply the proper changes to the next component:

- **Component**: page/post-page/PostPage.jsx

**Why is it important?** It's not very common nowadays to come across a project built from scratch using React class components (as they are not recommended). However, you may encounter them in older projects or libraries that have not been updated. On your journey to becoming a Master Jedi, it's important to familiarize yourself with some basic features of the old way of building components.

✅DONE✅### Don’t repeat yourself, STUPID (Opss, that was KISS)

The objective of this task is to improve the Axios services. The previous developers have repeated the headers so many times. At the same time, we need to provide some logic where if we detect an error 401 (Unauthorized), you should log out the current user.

**Sirius Tip:** Read about interceptors ;)

**Why is it important?** In order to reduce the duplicated lines, we need to know when and how to reduce them.

✅DONE✅### Caching makes your life (and the users') simpler

You may have noticed we do a lot of requests. Every time you go to a page, we request the data again from the BE.

This can be solved, like in the previous step (**DRY, part two**) by saving the data globally with redux.

But there is a much simpler way, called **caching**.

By caching, the data you get from the Backend is saved so when you request it again it is automatically returned from the cache.

Investigate about caching with [React query](https://tanstack.com/query) and implement it in all routes inside the httpRequestService.

**Why is it important?** By caching the data, you not only save money by reducing the amounts of requests you do to the backend but also create a much more seamless experience for the user, as he only has to wait for the data to be fetched once

**S(e)irius tip** Don't forget to investigate about [Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations) and [Query invalidations](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation)

✅DONE✅### Continuation

The "user" object is used in many places, like Header, CommentPage, etc.

In all these places, we fetch the user from the Backend with service.me().

If you haven't move this to a cache query provider, do it so this info is cached by the backend

✅DONE✅### Bug Hunting time

The objective of this task is to fix 2 bugs that the app has.

1. We are not checking that the user already exists when registering.
2. The menus (those kind of floating containers) when users click out of them, they are not closing.

✅DONE✅### Validation

The objective of this task is to add some validations to the input fields that the app has. This time we will use Formik to perform the validations. It’s a famous library that allows us to add some logic to validate what users fill in.

**Why is it important?** As a frontend, you are always in front of the end user, that’s why you have to help them to know what's going on, and why it's failing if they encounter an input error.

✅DONE✅### Style it

The objective of this task is to update some style files into styledComponents one. You will see that this technology is being used in almost every file in the project.

- **Component**: /components/follow-user/FollowUserBox.css
- **Component**: /components/user-data-box/UserDataBox.css

After that, you have to create from scratch a button and an input field, and should support variants, states, and sizes.

**Variants**: outlined, fulfilled, ghost & white
**Size**: small, medium, large

✅DONE✅### Errors exist, and are not only for you

Humans are not perfect. Sometimes we encounter errors. Whether it's a validation error, a backend error, or any other, the user needs to know (if it bears him).

For us, developers, with a simple `console.error(e)` we are more than satisfied. But, unluckily, not all people are as smart as us.

That's where toasts come to save the day.

Toasts are a great way of showing the user that something happened. It can be an error toast (the most common one) but you may also se information, success, or waning toasts. For example, when you send an email in gmail, you will se a "Message sent" toast at the bottom.

Lucky for you, the toast is already created inside the "toast" folder.

**What you have to do is implement it where you think is important to show the user some info, whether is an error or a success message**

We've seen how important DRY is, so I don't want you to import the **Toast** component inside every file you use it. See how to implement it globally

✅DONE✅### Infinite Scroll

The objective of this task is to add an infinite scroller to see tweets on the home screen. This is the way that X (ex twitter) has to load tweets.

✅DONE✅### Portals

The objective of this task is to enhance the app's modals. To achieve this, you need to master the art of Portals 🕳️. This feature, though not widely known, is useful for injecting components into another location without complexity.

**Why is it important?** Sometimes, we need to develop features that must bypass the hierarchical structure of the app (e.g., dropdowns, filters, modals, tooltips, menus, etc.). React Portal is a feature that enables us to achieve this type of behavior.

✅DONE✅### Let’s chat

The objective of this task is to add functionality to chat with someone. You have already done the backend job, now is the time to apply it to the Frontend. Create a service to add the sockets that you will use.

### Finally, some testing

Add some Unit tests to the more atomic components of the app. Which? Is up to you

Which unit testing framework to use? You guessed right, is up to you too

Here are a few options, but you can search for more:

1. Jest
2. Vitest
3. Cypress for component testing

Also, implement a CI/CD pipeline in github that runs these tests every time a push is made to your master branch.

**Why is it important?** Having code that does not work in your master branch is something we should avoid at all costs. Runing tests when you push to it is a great way of reducing the risk

### 🚀 To the moon

Deploy your app to a hosting of your choice. Here are some recommended options:

- [Vercel](https://vercel.com/docs/deployments/overview)
- [Netlify](https://www.netlify.com/)
- [AWS](https://aws.amazon.com/)(You need previous AWS knowledge)

**PD**: Don't forget to change your frontend for it to connect to the backend you deployed for the Twitter Backend challenge
