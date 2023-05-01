# Hively - Smart Home Application
## View Statuses of Appliances, Apertures, Air Quality and Control Temperature
![hively_dashboard](https://user-images.githubusercontent.com/49097168/235550763-a6265751-33f6-40bc-ba25-281b211c96b9.png)
## View Monthly Reports and Edit Your Budget
![hively_reports](https://user-images.githubusercontent.com/49097168/235550816-97a955b9-df2d-4d51-afa8-7a5cc0ff3650.png)
## Test Appliances and Apertures and Run Event Simulations
![hively_control](https://user-images.githubusercontent.com/49097168/235550885-bd45facd-b3ae-4499-ac6e-89290a606029.png)


# How to Run - Backend Server

To get started, clone this branch then run the following commands

in the top level directory of the project

```
python3 -m venv env
source venv/bin/activate

pip install -r requirements.txt

python3 manage.py runserver --noreload
```

Then you can clone the 499-term-frontend and follow its setup instructions to access the app via the front end


# How to Run - Frontend Interface

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, to run the development server:

```bash
npm install
```

then,

```bash
npm run dev
```

Make sure you have the API dev server running as well with the --noreload flag.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
