import { deterministicPartitionKey } from "./dpk"

describe("deterministicPartitionKey", () => {
  test("should return the partition key when the event is undefined", () => {
    expect(deterministicPartitionKey(undefined)).toBe("0")
  })

  test("should return the partition ket when it exists", () => {
    const event = {
      partitionKey: "customKey",
    }
    expect(deterministicPartitionKey(event)).toBe("customKey")
  })

  test("should return sha key when no partition key is provided", () => {
    const event = {
      foo: "bar",
    }
    const result = deterministicPartitionKey(event)
    expect(result).not.toBe("0")
    expect(result).toHaveLength(128) // Length of sha3-512 hash in hex format
  })

  test("should return sha key when the candidate length is greater than the maximum allowed", () => {
    const event = {
      partitionKey: "a".repeat(257),
    }
    const result = deterministicPartitionKey(event)
    expect(result).toHaveLength(128) // Length of sha3-512 hash in hex format
  })
})
