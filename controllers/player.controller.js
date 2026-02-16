import createPlayerService from '../services/players/createPlayer.service.js';
import { handleResponse } from '../utils/handleResponse.util.js'
import verifyEmailService from '../services/players/verifyPlayer.service.js'
import { generateEmailToken } from '../utils/emailToken.util.js';
import mail from '../services/nodemailer/email.service.js';

class playerController {
  async createPlayer(req, res, next) {
    try {
      const service = createPlayerService.execute({
        data: req.body
      }, req.context)

      const player = await service.run();

      const emailToken = generateEmailToken(player);

      await mail.sendVerificationEmail(
        emailToken, player.email
      );

      handleResponse(res, {
        status: 201,
        message: " Signup SuccessFull! Please verify your email.",
        data: player
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const { token } = req.query;
      const result = await verifyEmailService.verify(token);

      if (result.alreadyVerified) {
        return res.json({
          message: 'Email already verified'
        });
      }

      handleResponse(res, {
        status: 200,
        message: " Email verified successfully"
      });

    } catch (error) {
      next(error);
    }
  }
}


export default new playerController();
