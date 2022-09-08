import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import tiktok from './tiktok_clone.json';

export const CLUSTER ="devnet";

export const SOLANA_HOST = clusterApiUrl("devnet")

export const TIKTOK_PROGRAM_ID = new PublicKey('Az4edEtU6JtghfueC4hS7Fo5fG3evPY5VUt6YbNHmhaN');

export const TIKTOK_IDL = tiktok;