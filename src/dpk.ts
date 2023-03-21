import crypto from "crypto"

const TRIVIAL_PARTITION_KEY = "0"
const MAX_PARTITION_KEY_LENGTH = 256

interface Event {
  partitionKey?: string
  [key: string]: any
}

const shaKey = (data: string): string => {
  return crypto.createHash("sha3-512").update(data).digest("hex")
}

const JsonToString = (candidate: any): string => {
  return typeof candidate !== "string" ? JSON.stringify(candidate) : candidate
}

const deterministicPartitionKey = (event?: Event): string => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY
  }

  let candidate = event.partitionKey || shaKey(JSON.stringify(event))
  candidate = JsonToString(candidate)

  return candidate.length > MAX_PARTITION_KEY_LENGTH
    ? shaKey(candidate)
    : candidate
}

export { deterministicPartitionKey }
