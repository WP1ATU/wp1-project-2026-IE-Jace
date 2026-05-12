# Sky Observer Architecture

```mermaid
flowchart LR
  browser[UserBrowser] --> angularSpa[AngularSPA]
  angularSpa --> expressApi[ExpressAPI]
  expressApi --> usnoApi[USNO_API]
  expressApi --> mongoDb[MongoDB_Atlas]
  angularSpa --> s3Host[S3_Hosting]
  expressApi --> ec2Host[EC2_Hosting]
```

## Notes
- The Angular SPA handles UI, routing, and client-side interactions.
- Express centralizes all API calls and persistence logic.
- MongoDB Atlas stores user-created locations and lookup history.
