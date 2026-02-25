import express from 'express'
import playerController from '../controllers/player.controller.js';
import contextMiddleware from '../middlewares/context.middleware.js';
import passport from 'passport';

const router = express.Router();

router.post('/',contextMiddleware(true), playerController.createPlayer);

router.get('/verify_email', playerController.verifyEmail);

router.post('/login', contextMiddleware(true), playerController.loginPlayer)

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/api/auth/google/failure" }),
  playerController.successGoogleAuth
);

router.get("/google/failure", playerController.failure);

export default router;

//http://localhost:8080/api/v1/players/google
