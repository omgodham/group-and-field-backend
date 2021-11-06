const { default: axios } = require('axios');


exports.Payout = (req, res) => {

    let token = 'A21AAIGkWochm4yHgbPXwUdaizYIFQtlWvHOJmmeWtvmRCdnX7a_iyENb7iiMBtdRgerJBsI2tqYHjF7s8PjvEkifbCimEC9Q';
    let {email,amount} = req.body;


    // console.log(req.body);
    console.log('EMAIL', email,'AMOUNT',amount);
    let batchID = Math.floor(1000000000 + Math.random() * 9000000000);
    console.log(batchID);

    let data = {
        "sender_batch_header": {
          "sender_batch_id": batchID,
          "recipient_type": "EMAIL",
          "email_subject": "You have money!",
          "email_message": "You received a payment. Thanks for using our service!"
        },
        "items": [
          {
            "amount": {
              "value": amount,
              "currency": "USD"
            },
            "sender_item_id": "201403140001",
            "recipient_wallet": "PAYPAL",
            "receiver": 'sb-t8fjd7703249@personal.example.com'
          },
        ]
      }

    axios.post('https://api-m.sandbox.paypal.com/v1/payments/payouts',data,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(response => {

      let batchID = response.data.batch_header.payout_batch_id;
      res.status(200).json(`Payment successful with BatchID - ${batchID}`);
      console.log(response);
      // console.log(batchID);
      // let data = batchID;
      // axios.post(`https://api-m.sandbox.paypal.com/v1/payments/payouts/${batchID}`,data,{ headers: {"Authorization" : `Bearer ${token}`} })
      // .then(receipt => {
      //   console.log('receipt');
      //   console.log(receipt);
      //   // res.status(200).send(receipt);
      // })
      // .catch(err => {
      //   console.log(err);
      //   // res.status(402).send(err);
      // })

    })
    .catch(error => {
        res.status(402).json('Something went wrong.Please try again!');
        console.log(error)
    })


}