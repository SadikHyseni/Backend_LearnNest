import PropertiesReader from "properties-reader";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient, ServerApiVersion } from "mongodb";

// Resolve __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load properties file
const propertiesPath = path.resolve(__dirname, "db.properties");
const properties = PropertiesReader(propertiesPath);

// Build MongoDB connection string
const uri = `${properties.get("db.prefix")}${encodeURIComponent(properties.get("db.user"))}:${encodeURIComponent(properties.get("db.pwd"))}${properties.get("db.dbUrl")}${properties.get("db.params")}`;

// Create a MongoDB Client
export const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
export const db = client.db(properties.get("db.dbName"));

// Define collections and export them
export const collections = {
  lessons: db.collection("lessons"),
  orders: db.collection("orders"),
};

// Function to connect to MongoDB
export async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
}
