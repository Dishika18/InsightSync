# If you want to deploy the Backend on Vercel

If you want to deploy your backend to Vercel, follow these steps:

1. Access the Vercel Website
Go to [Vercel](https://vercel.com/) and log in or sign up if you haven’t already.

2. Import the Repository
After logging in, import the **Insightsync forked repository** from your GitHub account.

3. Configure Deployment Settings
- In the **Root Directory** option, select the `server` folder.
- Add environment variables by clicking on the **Environment Variables** section.

4. Add the Environment Variable
Inside the Vercel project settings, add the following environment variable:
```bash
MONGO_URI="your_mongodb_connection_url"
```
Make sure to replace `your_mongodb_connection_url` with your actual MongoDB URL.

5. Deploy the Server
Click on the **Deploy** button to start the deployment process. After a few moments, your backend server will be deployed successfully!

You can now test your deployed API by checking the provided Vercel URL.

