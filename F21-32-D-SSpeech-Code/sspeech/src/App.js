import { BrowserRouter as Router, Routes, Route, Navigate, Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import icon from './pencil.png'
import Sketch from "react-p5";
import './App.css';
import axios from 'axios';
import User from './User';
import slider from './sunset.jpg';
import slider2 from './afternoon.jpg';
import ppic from './image.jpg';
import slider3 from './evening.jpg';
import Loading from './Loading.js';
import loginPic from './login_pic.png';

function App() {
	const [done, setDone] = useState(undefined);
	useEffect(() => {
		setTimeout(() => {
			setDone(true);
		}, 2000);
	}, []);

	return (
		<> {
			!done ? <Loading /> :
			<div>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Router>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/autocomplete" element={<AutoComplete />} />
						<Route path="/logout" element={<Logout />} />
						<Route path="/predicter" element={<Predicter />} />
					</Routes>
				</Router>
				<Footer />
			</div>
		}</>
	);
}

const downloadTxtFile = (x) => {
	const element = document.createElement("a");
	const file = new Blob([x], {
	  type: "text/plain"
	});
	element.href = URL.createObjectURL(file);
	element.download = "result.txt";
	document.body.appendChild(element);
	element.click();
};

function handleClick(e) {
	e.preventDefault()
	var x = document.getElementById("selection");
	downloadTxtFile(x.value);
}

function AutoComplete() {
	fetch('./classes.txt')
		.then(function(response){
			return response.text();
		}).then(function (data) {
		console.log(data);
	})
    return (
        <div>
            <ImageSlider />
            <div className="home">
                <h1>Auto Complete Drawings!</h1>
                <h4>You draw, we Assist!</h4>
                <p>Select an object from the dropdown list. Start drawing it on the canvas and AutoComplete will assist you in your drawing.</p>
				<select id="selection">
					<option value={"ambulance"}>Ambulance</option>
					<option value={"angel"}>Angel</option>
					<option value={"ant"}>Ant</option>
					<option value={"basket"}>Basket</option>
					<option value={"bat"}>Bat</option>
					<option value={"bear"}>Bear</option>
					<option value={"bee"}>Bee</option>
					<option value={"bird"}>Bird</option>
					<option value={"book"}>Book</option>
					<option value={"butterfly"}>Butterfly</option>
					<option value={"bicycle"}>Bicycle</option>
					<option value={"brain"}>Brain</option>
					<option value={"cat"}>Cat</option>
					<option value={"chair"}>
						Chair
					</option>
					<option value={"couch"}>Couch</option>
					<option value={"alarm_clock"}>
						Clock
					</option>
					<option value={"dog"}>
						Dog
					</option>
					<option value={"eye"}>
						Eye
					</option>
					<option value={"face"}>
						Face
					</option>
					<option value={"fan"}>
						Fan
					</option>
					<option value={"flower"}>
						Flower
					</option>
					<option value={"frog"}>
						Frog
					</option>
					<option value={"giraffe"}>
						Giraffe
					</option>
					<option value={"grapes"}>
						Grapes
					</option>
					<option value={"hammer"}>
						Hammer
					</option>
					<option value={"hand"}>
						Hand
					</option>
					<option value={"hat"}>
						Hat
					</option>
					<option value={"horse"}>
						Horse
					</option>
					<option value={"house"}>
						House
					</option>
					<option value={"key"}>
						Key
					</option>
					<option value={"lion"}>
						Lion
					</option>
					<option value={"mosquito"}>
						Mosquito
					</option>
					<option value={"pig"}>
						Pig
					</option>
					<option value={"pool"}>
						Pool
					</option>
					<option value={"rain"}>
						Rain
					</option>
					<option value={"river"}>
						River
					</option>
					<option value={"shoe"}>
						Shoe
					</option>
					<option value={"smiley face"}>
						Smiley Face
					</option>
					<option value={"spider"}>
						Spider
					</option>
					<option value={"square"}>
						Square
					</option>
					<option value={"stairs"}>
						Stairs
					</option>
					<option value={"star"}>
						Star
					</option>
					<option value={"sun"}>
						Sun
					</option>
					<option value={"sword"}>
						Sword
					</option>
					<option value={"table"}>
						Table
					</option>
					<option value={"the_mona_lisa"}>
						The Mona Lisa
					</option>
					<option value={"toothbrush"}>
						Toothbrush
					</option>
					<option value={"train"}>
						Train
					</option>
					<option value={"violin"}>
						Violin
					</option>
					<option value={"whale"}>
						Whale
					</option>
				</select>
				<button className='btn btn-primary buttonConfirm' onClick={handleClick}>Confirm</button>
				<a className="link" target="_blank" href={process.env.PUBLIC_URL + "p5/p5_index.html"}> Go to Canvas</a> 
            </div>
        </div>
    )
}

function Predicter() {
	return (
		<div>
			<ImageSlider />
			<div className="home">
				<a className="link" target="_blank" href={process.env.PUBLIC_URL + "Predicter/index.html"}> Go to Canvas</a>	
            </div>
		</div>
	);
}

function Home() {
    return (
        <div>
            <ImageSlider />
            <div className="home">
                <h1>Welcome to Scribbling Speech!</h1>
                <p>Language and images are closely intertwined: We think in pictures and we explain facts as spatial constellations. What if the spoken word could be transformed into dynamic visual worlds in real time? Speech input, machine learning and recurrent neural networks for image generation allow to com- puter generate complex imaginary worlds that follow the narrator and thus create complex animations controlled by linguistic structures.</p>
                <p>Scribbling Speech transforms real-time spoken words into animated drawings by using Google's speech recognition API, natural language API and Quick Draw dataset. It extracts useful information from our spoken words, finding the corresponding drawings according to the nouns, applying movement path according to the verbs, etc. An interactive webpage that transforms real-time speech into animated drawings. User can describe a scene with his/her spoken words and the canvas will react and draw what users say.</p>
            </div>
        </div>
    );
}

function LoginHandler(e) {
    document.getElementById("loginerror1").style.display = "none";
    document.getElementById("loginerror2").style.display = "none";
    let users = [];
    var x = document.getElementsByClassName("abc");
    const inputFeilds = document.querySelectorAll("input");
    const validInputs = Array.from(inputFeilds).filter(input => input.value !== "");
    if (validInputs.length < x.length) {
        document.getElementById("loginerror2").style.display = "block";
        e.preventDefault();
        return <Navigate to="/login" />;
    }
    else {
        (async () => {
            const response = await axios.get("http://localhost:5000/users", User);
            for (var i = 0; i < response.data.length; i++) {
                users[i] = JSON.parse(JSON.stringify(response.data[i]));
            }
            for (var i = 0; i < users.length; i++) {
                if (validInputs[0].value == users[i].email && validInputs[1].value == users[i].password) {
					document.getElementById("logout").style.display = "block";
					document.getElementById("login").style.display = "none";
					document.getElementById("signup").style.display = "none";
                   return <Navigate to="/autocomplete" />;
                }
            }
            e.preventDefault();
            return <Navigate to="/login" />;
        })();
    }
}

function Login() {
	return (
		<div>
			<div className="flex-container logincomp">
				<div id="nothiddenLogin" className="flex-child">
					<div className="register container storeheading">
						<h1>Scribbling Speech</h1>
					</div>
					<div className="register container">
						<h2>Log-In to your Account</h2>
					</div>
					<div className="register container">
						<div className="forminput">
							<div className="form-group">
								<label className="label-names d-flex align-content-start">
									Email&nbsp;
								</label>
								<input name="email" id="email" type="email" className="abc form-control rounded-lg auth-input-fields input-fields-height " placeholder="Enter your Email..." required="" autoFocus="" />
								<span id="loginerror1" className="text-danger" role="alert">
									<small>These are wrong credentials.</small>
								</span>
								<label className="intermediate label-names d-flex align-content-start">
									Password&nbsp;
								</label>
								<input name="password" id="password" type="password" className="abc form-control rounded-lg auth-input-fields input-fields-height " placeholder="*******" required="" />
								<span id="loginerror2" className="text-danger" role="alert">
									<small>Please fill out all fields</small>
								</span>
								<button id="login-btn" type="submit" className="submitButton ripplelink form-control Poppins semibold rounded-lg btn btn-primary" onClick={LoginHandler}>
									Log In
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="flex-child logindesign">
					<img src={loginPic} width="1000" height="700" />
				</div>
			</div>
		</div>
	);
}

function LogoutHandler() {
    document.getElementById("login").style.display = "block";
    document.getElementById("signup").style.display = "block";
	document.getElementById("logout").style.display = "none";
}

function changeMind() {
    document.getElementById("logout").style.display = "block";
}

function Logout() {
	return (
		<div>
			<div className="flex-container">
				<div className="flex-child logout_">
					<h2 className="logout_inside1">Leaving already? ☹️</h2>
					<h5 className="logout_inside2">Hope to see you again soon!</h5>
					<div className="logoutcomp logout_inside3">
						<Link to="/">
							<button type="submit" className="ripplelink form-control Poppins semibold rounded-lg btn btn-primary" onClick={LogoutHandler}>
								Logout from your Account
							</button>
						</Link>
					</div>
					<div>
						<small>Change your mind? <Link to="/" className="text-decoration-none inline-block forgot-text">Go back</Link></small>
					</div>
				</div>
				<div className="flex-child last">
					<img src={loginPic} width="800" height="641" />
				</div>
			</div>
		</div>
	);
}

function SignUp() {
	return (
		<div>
			<div className="flex-container signupcomp">
				<div id="nothiddenSignup" className="flex-child">
					<div className="register container storeheading">
						<h1>Scribbling Speech</h1>
					</div>
					<div className="register container">
						<h2>Join us today!</h2>
					</div>
					<div className="register container">
						<div className="forminput">
							<div className="form-group">
								<label className="label-names d-flex align-content-start">
									First Name&nbsp;
								</label>
								<input name="firstname" id="firstname" type="text" className="abc form-control rounded-lg auth-input-fields input-fields-height " placeholder="Enter your First Name..." required="" autoFocus="" />
								<label className="intermediate label-names d-flex align-content-start">
									Last Name&nbsp;
								</label>
								<input name="lastname" id="lastname" type="text" className="abc form-control rounded-lg auth-input-fields input-fields-height " placeholder="Enter your Last Name..." required="" autoFocus="" />
								<label className="intermediate label-names d-flex align-content-start">
									Email&nbsp;
								</label>
								<input name="email" id="email" type="email" className="abc form-control rounded-lg auth-input-fields input-fields-height " placeholder="Enter your Email..." required="" autoFocus="" />
								<label className="intermediate label-names d-flex align-content-start">
									Password&nbsp;
								</label>
								<input name="password" id="password" type="password" className="abc form-control rounded-lg auth-input-fields input-fields-height " placeholder="*******" required="" />
								<label className="intermediate label-names d-flex align-content-start">
									Confirm Password&nbsp;
								</label>
								<input name="confirmpassword" id="confirmpassword" type="password" className="abc form-control rounded-lg auth-input-fields input-fields-height " placeholder="*******" required="" />
								<span id="signuperror" className="text-danger" role="alert">
									<small>Please fill out all fields</small>
								</span>
								<button id="signup-btn" type="submit" className="submitButton ripplelink form-control Poppins semibold rounded-lg btn btn-primary" onClick={SignUpHandler}>
									Sign Up
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="flex-child signupdesign">
					<img src={loginPic} width="1000" height="776" />
				</div>
			</div>
		</div>
	);
}

function SignUpHandler(e) {
    document.getElementById("signuperror").style.display = "none";
    var x = document.getElementsByClassName("abc");
    const inputFeilds = document.querySelectorAll("input");
    const selectFields = document.querySelectorAll("select");
    const validInputs = Array.from(inputFeilds).filter(input => input.value !== "");
    const validInputs1 = Array.from(selectFields).filter(select => select.value !== "");
    let users = [];
    if ((validInputs.length + validInputs1.length) < x.length) {
        document.getElementById("signuperror").style.display = "block";
        e.preventDefault();
        return <Navigate to="/login" />;
    }
    else {
        let users = [];
        (async () => {
            const response = await axios.get("http://localhost:5000/users", User);
            for (var i = 0; i < response.data.length; i++) {
                users[i] = JSON.parse(JSON.stringify(response.data[i]));
            }
            let user = new User(users.length + 1, validInputs[0].value, validInputs[1].value, validInputs[2].value, validInputs[3].value);
			document.getElementById("logout").style.display = "block";
			document.getElementById("login").style.display = "none";
			document.getElementById("signup").style.display = "none";
			(async () => {
                const response = await axios.post("http://localhost:5000/users/add", user);
            })();
            alert("Thank you for Registration");
            return <Navigate to="/autocomplete" />;
        })();
    }
}
function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light menu">
			<img src={icon} width='35' />
			<Link className="navbar-brand" to="/">&emsp;Scribbling Speech&emsp;&emsp;</Link>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link className="nav-link" to="/">Home</Link>
					</li>
					<li id="login" className="nav-item">
						<Link className="nav-link" to="/login">Login</Link>
					</li>
					<li id="signup" className="nav-item">
						<Link className="nav-link" to="/signup">Sign Up</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/autocomplete">Auto Complete</Link>
					</li>
				</ul>
				<div id="logout">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<img className="profilepic" src={ppic} width="40" />
						</li>
						<li className="nav-item ml-auto">
							<Link className="nav-link" to="/logout">Logout</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

function ImageSlider() {
    return (
        <div>
            <div className="Slider">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src={slider} alt="First slide" height='300px' />
                        </div>

                        <div className="carousel-item">
                            <img className="d-block w-100" src={slider2} alt="Second slide" height='300px' />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={slider3} alt="Third slide" height='300px' />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

function Footer() {
    return (
        <div>
            <footer id="foot" className="page-footer font-small blue">
                <div className="footer">
                    <div className="footer-copyright text-center py-3">© 2021 Scribbling Speech: <a className="lnk" href="mailto:i180595@nu.edu.pk">Contact Us</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;