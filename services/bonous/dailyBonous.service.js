import anniversaryService from "./anniversary.service.js";
import birthdayService from "./birthday.service.js";

class DailyBonusService {
    async run() {
        console.log("Daily bonus job started");

        try {
            await birthdayService.run();
            await anniversaryService.run();
        } catch (error) {
            console.log("Error running daily bonus job: ", error);
        }
    }
}

export default new DailyBonusService();