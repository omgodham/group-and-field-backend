const { default: axios } = require('axios');


exports.Payout = (req, res) => {

    let token = 'A21AAJjWC5uoAipaAtYD8Qr9ffoWg_EdliKBf-QiJsIAimOjrnRC-QaqeyeuGBXeBbGjjbKPy9mSPparpEsnO-YgbAgNt1udg';

    let data = {
        "sender_batch_header": {
          "sender_batch_id": "2014022801",
          "recipient_type": "EMAIL",
          "email_subject": "You have money!",
          "email_message": "You received a payment. Thanks for using our service!"
        },
        "items": [
          {
            "amount": {
              "value": "9.87",
              "currency": "USD"
            },
            "sender_item_id": "201403140001",
            "recipient_wallet": "PAYPAL",
            "receiver": req.body.email
          },
        ]
      }

    console.log(req.body);

    axios.post('https://api-m.sandbox.paypal.com/v1/payments/payouts',data,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    })


}