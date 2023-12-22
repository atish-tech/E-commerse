const router = require("express").Router();
const passport = require("passport");

router.get("/success", (req, res) => {
    console.log({data : "asd"});
    // console.log(req);
    // res.send(`Welcome ${req.user.email}`)
})

router.get('/google',
    passport.authenticate('google', { scope: ['profile' , 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        // console.log(res._raw);
        // res.status(200).send(res);
        console.log(res._raw);
        console.log(res , "Google");
        res.redirect('http://localhost:3000');
        // res.redirect('/auth/success');


    });

module.exports = router;







// const router = require("express").Router();
// const passport = require("passport");

// router.get("/login/success", (req, res) => {
// 	if (req.user) {
// 		res.status(200).json({
// 			error: false,
// 			message: "Successfully Loged In",
// 			user: req.user,
// 		});
// 	} else {
// 		res.status(403).json({ error: true, message: "Not Authorized" });
// 	}
// });

// router.get("/login/failed", (req, res) => {
//     console.log("Login faild");
// 	res.status(401).json({
// 		error: true,
// 		message: "Log in failure",
// 	});
// });

// router.get("/google", passport.authenticate("google", ["profile", "email"]));

// router.get(
// 	"/google/callback",
// 	passport.authenticate("google", {
// 		successRedirect: "http://localhost:3000",
// 		failureRedirect: "/login/failed",
// 	})
// );

// router.get("/logout", (req, res) => {
// 	req.logout();
// 	res.redirect("http://localhost:3000");
// });

// module.exports = router;


