'use client'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Button} from "@/components/ui/button"
import {useState} from "react"
import Loader from "@/components/ui/loader"

const JOKE_TYPES = ['general', 'knock-knock', 'programming', 'dad']

export default function Home() {

  const [jokeType, setJokeType] = useState('')
  const [loading, setLoading] = useState(false)
  const [joke, setJoke] = useState({setup: '', punchline: ''})
  const [punchlineWasClicked, setPunchlineWasClicked] = useState(false)


  const onSelectChange = (value: string) => setJokeType(value)

  const onGetSetupClicked = async () => {
    if (!jokeType) return
    setLoading(true)
    const res = await fetch(`https://official-joke-api.appspot.com/jokes/${jokeType}/random`)
    const data = await res.json()
    setJoke({setup: data[0].setup, punchline: data[0].punchline})
    setPunchlineWasClicked(false)
    setLoading(false)
  }


  const onGetPunchlineClicked = () => setPunchlineWasClicked(true)

  return (
      <>
        {loading && <Loader/>}
        <div className="h-screen w-screen flex items-center justify-center flex-col">
          <p className="badge">Yevhenii Kolisnyk <br/>92385</p>
          <p className="text-4xl font-bold">Get random joke</p>
          <div className="flex gap-2 mt-2">

            <Select onValueChange={(e) => onSelectChange(e)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select joke type"/>
              </SelectTrigger>
              <SelectContent>
                {JOKE_TYPES.map((joke, index) => (
                    <SelectItem key={index} value={joke}>{joke}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button disabled={!jokeType} variant="outline" onClick={onGetSetupClicked}>Get setup</Button>

            <Button disabled={!joke.setup || punchlineWasClicked} variant="outline"
                    onClick={onGetPunchlineClicked}>Get
              punchline</Button>

          </div>
          {joke.setup && <div className="py-2"><p>{joke.setup}</p></div>}

          {punchlineWasClicked && <div className="pb-2"><p>{joke.punchline}</p></div>}
        </div>
      </>
  )
}
