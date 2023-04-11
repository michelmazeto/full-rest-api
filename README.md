<h1>First Challenger - COMPASS</h1>


<h2>▶ Challenge Description</h3>
<p>This API was developed for 'Grid Motors', a car rental dealership. It features user, car, and reservation registration, with some authenticated routes.</p>

<h2>▶ Topics</h2>
<p>• Recommended Tools</p>
<p>• Dependencies</p>
<p>• Features</p>
<p>• How to run the API</p>

<h2>▶ Recommended Tools</h2>
<p> • VSCode</p>
<p> • Postman</p>

<h2>▶ Dependencies</h2>
<p>• @types/bcrypt</p>
<p>• @types/jsonwebtoken</p>
<p>• @types/mongoose</p>
<p>• @types/validator</p>
<p>• axios</p>
<p>• bcrypt</p>
<p>• cors</p></p>
<p>• dotenv</p>
<p>• express</p>
<p>• jsonwebtoken</p>
<p>• mongoose</p>
<p>• validator</p>

<h2>▶ Features</h2>
<p>➝ Register new users, cars, and reservations</p>
<p>➝ List all users, cars, and reservations</p>
<p>➝ Delete users, cars, or reservations</p>
<p>➝ Login and password validation</p>
<p>➝ Authentication routes</p>

<h2>▶ How to Run the API</h2>
<h3>Install Node.js</h3>
<pre><code>https://nodejs.org/en/</code></pre>

<h3>Install Git</h3>
<h3>Cloning and Running</h3>

<p>In your terminal, clone the project:</p>
<pre><code>git clone https://github.com/michelmazeto/desafio.git</code></pre>

<p>Access the root of the project:</p>
<pre><code>cd full-rest-api</code></pre>

<p>Install the dependencies:</p>
<pre><code>npm install</code></pre>

<p>Start the server:</p>
<pre><code>npm start</code></pre>
<h3>Testing the API</h3>
<p>Install Postman or another application to run the API</p>
<pre><code>https://www.postman.com/downloads/</code></pre>
<p>Note: The default port for the server is 3000. To access the API, use: localhost:3000/api/v1/</p>

</br>
<h3>Car </h3>
<h4>💠 To create a car </h4>
<p>POST Method and path: 127.0.0.1:3000/api/v1/car</p>
<p>Then, go to Body > raw > change from Text to JSON and use the following format:</p>
<pre><code>
{
    "model": "model",
    "color": "color",
    "year": "year",
    "value_per_day": value,
    "accessories": [
        {
            "description": "x"
        },
        {
            "description": "y"
        },
        {
            "description": "z"
        }
    ],
    "number_of_passengers": value
}
</pre></code>
</br>

<h4>💠 To list all cars:</h4>
<p>GET Method and path: 127.0.0.1:3000/api/v1/car/</p>
</br>

<h4>💠 To search for a car by ID:</h4>
<p>GET Method and path: 127.0.0.1:3000/api/v1/car/'id'</p>
<p>Example:</p>
<p>GET Method and path: 127.0.0.1:3000/api/v1/car/642de750e50ad36cd5c1486e</p>
</br>

<h4>💠 To search for a car with query parameters:</h4>
<p>GET Method and path: 127.0.0.1:3000/api/v1/car?'query_params'</p>
<p>Example:</p>
<p>GET Method and path: 127.0.0.1:3000/api/v1/car?number_of_passengers=2</p>
</br>

<h4>💠 To delete a car by ID:</h4>
<p>DELETE Method and path: 127.0.0.1:3000/api/v1/car/'id'</p>
<p>Example:</p>
<p>DELETE Method and path: 127.0.0.1:3000/api/v1/car/642de8b2e50ad36cd5c14873</p>
</br>

<h4>💠 To update a car </h4>
<p>PATCH Method and path: 127.0.0.1:3000/api/v1/car/'id'</p>
<p>Then, go to Body > raw > change from Text to JSON and use the following format:</p>
<pre><code>
{
    "model": "model",
    "color": "color",
    "year": "year",
    "value_per_day": value,
    "accessories": [
        {
            "description": "x"
        },
        {
            "description": "y"
        },
        {
            "description": "z"
        }
    ],
    "number_of_passengers": value
}
</pre></code>
</br>

<h3> Users </h3>
<h4>💠 To create a user </h4>
<p>POST Method and path: 127.0.0.1:3000/api/v1/user</p>
<p>Then, go to Body > raw > change from Text to JSON and use the following format:</p>
<pre><code>
{
  "name": "name",
  "cpf": "valid cpf",
  "birth": "date",
  "email": "valid email",
  "password": "password",
  "qualified": "yes or no",
  "cep": "valid cep"
}
</pre></code>
</br>

<h4>💠 To list all users:</h4>
<p>GET Method and path: 127.0.0.1:3000/api/v1/user/</p>
</br>

<h4>💠 To search for a user by ID:</h4>
<p>GET Method and path: 127.0.0.1:3000/api/v1/user/'id'</p>
<p>Example:</p>
<p>GET Method and path: 127.0.0.1:3000/api/v1/car/64331e8cf3414c7decd96072</p>
</br>

<h4>💠 To search for a user with query parameters:</h4>
<p>GET Method and path: 127.0.0.1:3000/api/v1/user?'query_params'</p>
<p>Example:</p>
<p>GET Method and path: 127.0.0.1:3000/api/v1/user?name=Vanessa</p>
</br>

<h4>💠 To delete a user by ID:</h4>
<p>DELETE Method and path: 127.0.0.1:3000/api/v1/user/'id'</p>
<p>Example:</p>
<p>DELETE Method and path: 127.0.0.1:3000/api/v1/user/64333dcac841171c613216a9</p>
</br>

<h4>💠 To update a user </h4>
<p>PATCH Method and path: 127.0.0.1:3000/api/v1/user/'id'</p>
<p>Then, go to Body > raw > change from Text to JSON and use the following format:</p>
<pre><code>
{
  "name": "name",
  "cpf": "valid cpf",
  "birth": "date",
  "email": "valid email",
  "password": "password",
  "qualified": "yes or no",
  "cep": "valid cep"
}
</pre></code>
</br>

<h3> Reserve </h3>
<h4>💠 To create a reserve </h4>
<p>POST Method and path: 127.0.0.1:3000/api/v1/reserve</p>
<p>Then, go to Body > raw > change from Text to JSON and use the following format:</p>
<pre><code>
{
  "start_date": "0000-00-00T00:00:00Z",
  "end_date": "0000-00-00T00:00:00Z",
  "id_car": "642de8b2e50ad36cd5c14873",
  "id_user": "64336bc6c63a121e4700aa8b"
}
</pre></code>
</br>

<h4>💠 To list all reserves:</h4>
<p>GET Method and path: 127.0.0.1:3000/api/v1/reserve</p>
</br>

<h4>💠 To search for a reserve by ID:</h4>
<p>GET Method and path: 127.0.0.1:3000/api/v1/reserve/'id'</p>
<p>Example:</p>
<p>GET Method and path: 127.0.0.1:3000/api/v1/reserve/643416f91388ae0764d3e2cd</p>
</br>

<h4>💠 To search for a reserve with query parameters:</h4>
<p>GET Method and path: 127.0.0.1:3000/api/v1/reserve?'query_params'</p>
<p>Example:</p>
<p>GET Method and path: 127.0.0.1:3000/api/v1/reserve?id_user=64336bc6c63a121e4700aa8b</p>
</br>

<h4>💠 To delete a reserve by ID:</h4>
<p>DELETE Method and path: 127.0.0.1:3000/api/v1/reserve/'id'</p>
<p>Example:</p>
<p>DELETE Method and path: 127.0.0.1:3000/api/v1/reserve/643416f91388ae0764d3e2cd</p>
</br>

<h4>💠 To update a reserve </h4>
<p>PATCH Method and path: 127.0.0.1:3000/api/v1/reserve/'id'</p>
<p>Then, go to Body > raw > change from Text to JSON and use the following format:</p>
<pre><code>
{
  "start_date": "0000-00-00T00:00:00Z",
  "end_date": "0000-00-00T00:00:00Z",
  "id_car": "642de8b2e50ad36cd5c14873",
  "id_user": "64336bc6c63a121e4700aa8b"
}
</pre></code>
</br>

<h2> Development Dependencies</h2>

<p>● @types/cors</p>
<p>● @types/express</p>
<p>● @types/jest</p>
<p>● @types/node</p>
<p>● eslint</p>
<p>● eslint-config-airbnb-base</p>
<p>● eslint-plugin-import</p>
<p>● eslint-plugin-promise</p>
<p>● jest</p>
<p>● prettier</p>
<p>● prettier-eslint-cli</p>
<p>● ts-node</p>
<p>● typescript</p>

