const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

//Your webhooks payload endpoint
app.use(bodyParser.json())
app.use(cors())
app.post("/webhook", function(req, res) {
  const body = req.body;
  
  try {
    if (body.event === 'PARTICIPANT_REACHED_A_GOAL') {
      // Write code here to do something when a participant wins a reward
      console.log(`${body.data.participant.email} just won this reward: ${body.data.reward.description}`);

      // If the reward is approved
      if (body.data && body.data.reward && body.data.reward.approved) {
        // Do something
        console.log('#'.repeat(50))
        console.log(body)
        console.log('#'.repeat(50), '\n\n\n')
      }
      
      // If this is a double-sided reward, use body.data.reward.isReferrer to determine if this is reward is for the referrer or referred person
      if (body.data && body.data.reward && body.data.reward.isReferrer) {
        // Do something
      }

    } else if (body.event === 'NEW_PARTICIPANT_ADDED') {
      // Write code here to do something when a new participant is added    
      console.log(`${body.data.email} just joined via source: ${body.data.referralSource}.`);
            
    } else if (body.event === 'CAMPAIGN_ENDED') {
      // Write code here to do something when a campaign ends
      console.log(`${body.data.name} just ended with ${body.data.referralCount} total referrals!`);
            
    }
  
  } catch (err) {
    res.status(400).end();
  }
  res.json({ event: body.event, data: body.data });
})
app.listen(process.env.PORT || 8888, () => console.log('Server started.'));