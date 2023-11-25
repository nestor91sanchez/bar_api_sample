# Bar Api & App

## Setup

The first thing to do is to clone the repository:

```sh
$ git clone git@github.com:nestor91sanchez/bar_api_sample.git
$ cd bar_api_sample
```

Create a virtual environment to install dependencies in and activate it:

```sh
$ virtualenv2 --no-site-packages env
$ source env/bin/activate
```

Then install the dependencies:

```sh
(env)$ pip install -r requirements.txt
```
Note the `(env)` in front of the prompt. This indicates that this terminal
session operates in a virtual environment set up by `virtualenv2`.

Once `pip` has finished downloading the dependencies:
```sh
(env)$ cd project
(env)$ python manage.py runserver
```
And navigate to `http://127.0.0.1:8000/`.

In order to test the api, run migrations and fixtures
```sh
(env)$ python manage.py makemigrations
(env)$ python manage.py migrate
(env)$ python manage.py loaddata product_data.json
(env)$ python manage.py loaddata bill_data.json   
```
And navigate to `http://127.0.0.1:8000/pos/docs` to check the documentation.

In order to test the APP, run

Create a `.env` file inside `bar_app/` folder and put
SITE_URL=http://localhost:8000/pos/api/v1/ 


```sh
npm install
npm run dev  
```

And navigate to `http://localhost:3000/`

