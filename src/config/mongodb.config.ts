import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
// Check MONGO_URI before using, throw error if not set
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('MONGO_URI environment variable is not set');
}

export const MongoDBProvider = MongooseModule.forRoot(mongoUri);
