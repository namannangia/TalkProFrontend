import React, { useState } from "react";
import { TextField, Button, Link, Input } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./theme.css";
import Typography from "@mui/material/Typography";
import axios from "axios";
const BaseURL = "http://192.168.56.1:5000/";
function NewUser() {
	const [showPassword, setShowPassword] = useState(false);
	const [showCPassword, setShowCPassword] = useState(false);
	const [newUser, setNewUser] = useState(false);
	const [inputUsername, setInputUsername] = useState("");
	const [inputEmail, setInputEmail] = useState("");
	const [inputPassword, setInputPassword] = useState("");
	const [inputCPassword, setInputCPassword] = useState("");

	return (
		<div className="mainNewUser">
			<Typography
				variant="h3"
				sx={{
					marginTop: "10px",
					marginBottom: "30px",
					flex: 1,
					color: "#E5BA73",
				}}
			>
				TalkPro 📣
			</Typography>
			<div
				style={{
					bgcolor: "#FAEAB1",
					padding: "10px 50px 50px 50px",
					borderRadius: "20px",
					flex: 15,
					backgroundColor: "#FAEAB1",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<TextField
					id="Username"
					sx={{ margin: "10px", width: "25ch" }}
					label={newUser ? "Username" : "Username"}
					variant="standard"
					value={inputUsername}
					onChange={(e) => {
						setInputUsername(e.target.value);
					}}
				/>
				<TextField
					id="Email"
					sx={{
						margin: "10px",
						width: "25ch",
						display: newUser ? "inherit" : "none",
					}}
					value={inputEmail}
					label="Email"
					variant="standard"
					onChange={(e) => {
						setInputEmail(e.target.value);
					}}
				/>
				<FormControl
					sx={{ m: 1, width: "25ch" }}
					variant="standard"
					id={"confirmPassword"}
				>
					<InputLabel htmlFor="standard-adornment-password">
						Password
					</InputLabel>
					<Input
						id="standard-adornment-password"
						onChange={(e) => {
							setInputPassword(e.target.value);
						}}
						type={showPassword ? "text" : "password"}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => {
										setShowPassword(!showPassword);
									}}
									onMouseDown={() => {
										setShowPassword(!showPassword);
									}}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label="Password"
					/>
				</FormControl>
				<FormControl
					sx={{ m: 1, width: "25ch", display: newUser ? "inherit" : "none" }}
					variant="standard"
				>
					<InputLabel htmlFor="standard-adornment-cpassword">
						Confirm Password
					</InputLabel>
					<Input
						id="standard-adornment-cpassword"
						onChange={(e) => {
							setInputCPassword(e.target.value);
						}}
						type={showCPassword ? "text" : "password"}
						value={inputCPassword}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => {
										setShowCPassword(!showCPassword);
									}}
									onMouseDown={() => {
										setShowCPassword(!showCPassword);
									}}
									edge="end"
								>
									{showCPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label="Confirm Password"
					/>
				</FormControl>
				<Button
					variant="contained"
					onClick={() => {
						alert(
							"Username: " +
								inputUsername +
								"\nPassword: " +
								inputPassword +
								"\nEmail: " +
								inputEmail
						);
						if (newUser) {
							axios
								.post(BaseURL + "create", {
									username: inputUsername,
									email: inputEmail,
									password: inputPassword,
								})
								.then((res) => {
									alert(
										JSON.stringify({
											username: inputUsername,
											email: inputEmail,
											password: inputPassword,
										})
									);
									if (res.data.status !== 200)
										alert("Duplicate entry" + res.data.status);
									else {
										window.location.href = window.location.origin + "/contact";
									}
								})
								.catch((e) => {
									alert("Error: " + e);
								});
						} else {
							axios
								.get(BaseURL + "users/" + inputUsername)
								.then((theUser) => {
									alert(
										"'" + theUser.data.password + "' '" + inputPassword + "'"
									);
									if (theUser.data.password === inputPassword) {
										alert("Sign in success");
										window.location.href = window.location.origin + "/contact";
									} else {
										alert("Username/Password doesn't match");
									}
								})
								.catch((e) => {
									alert("Error at NewUser: " + e);
								});
						}
					}}
					sx={{
						margin: "30px 10px 10px 10px",
						backgroundColor: "#E5BA73",
						":hover": { backgroundColor: "black" },
					}}
				>
					{newUser ? "Create Account" : "Login"}
				</Button>
				<br />
				<Link
					id={"NewUserLink"}
					component="button"
					variant="body2"
					onClick={() => {
						document.getElementById("NewUserLink").style.display = "none";
						document.getElementById("confirmPassword").style.visibility =
							"visible";
						setNewUser(true);
					}}
				>
					New User?
				</Link>
			</div>
			<p style={{ color: "red" }}>
				*Use <tt>admin ,admin</tt> <br />
				to explore app
			</p>
		</div>
	);
}

export default NewUser;
