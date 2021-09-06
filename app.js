import express from 'express';


const app = express();

let port = process.env.PORT || 3002;
  app.listen(port, err => {
    if (err) {
      console.log('Cannot run!');
    } else {
      console.log(`Running on the port ${port}` );
    }
  });


export default app;