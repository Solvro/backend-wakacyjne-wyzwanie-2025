import { writeFileSync } from "fs"

function eloZelo(x: number): void {
  const line = "Elo żelo"
  const content = Array<string>(x).fill(line).join("\n")

  writeFileSync("elo-zelo.txt", content, "utf8")

  for (let i: number = 0; i < x; i++) {
    console.log(line)
  }
}

const now = new Date()
const minutes = now.getMinutes()

eloZelo(minutes)
