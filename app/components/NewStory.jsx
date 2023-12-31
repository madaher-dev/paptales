"use client";
import { useEffect, useState, useRef } from "react";
import Characters from "./Characters";
import Modal from "./Modal";
import { useCompletion } from "ai/react";

export default function NewStory({ player, characters }) {
  const [audioElement, setAudioElement] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [auioLoading, setAudioLoading] = useState(false);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: "/api/completion",
    onFinish: (prompt, completion) => {
      setIsReady(true);
      const result = JSON.parse(prompt);
      setResultLanguage(result.language);
    },
  });
  const [isReady, setIsReady] = useState(false);

  function upsert(array, item) {
    // (1)
    // make a copy of the existing array
    const newArray = array.slice();

    const i = newArray.findIndex((_item) => _item.name === item.name);
    if (i > -1) {
      newArray[i] = item;
      return newArray;
    }
    // (2)

    newArray.unshift(item);
    return newArray;
  }

  const [formState, setFormState] = useState({
    style: "Adventure",
    language: "English",
    characters: [],
    location: "The Forest",
  });
  const [resultLanguage, setResultLanguage] = useState("english");
  const addCharacter = (character) => {
    setFormState({
      ...formState,
      // characters: [...formState.characters, character],
      characters: upsert(formState.characters, character),
    });
    setIsOpen(false);
  };
  let max = formState.characters.length >= 5 ? true : false;

  useEffect(() => {
    handleInputChange({
      target: {
        value: JSON.stringify(formState),
      },
    });
  }, [formState, formState.characters, formState.language, formState.style]);

  const handlePressSubmit = (e) => {
    e.preventDefault();
    setIsReady(false);
    // handle form submission logic
    // console.log("Form Data: ", formState);
    handleSubmit(e);
  };
  useEffect(() => {
    setFormState({
      ...formState,
      name: player.name,
      age: player.age,
      gender: player.gender,
      style: player.style,
      language: player.language,
      characters: player.characters || [],
    });
  }, [player]);
  const [isOpen, setIsOpen] = useState(false);
  const clearCharacters = () => {
    setFormState({
      ...formState,
      characters: [],
    });
  };
  const handleStop = (e) => {
    e.preventDefault();
    setIsReady(true);
    stop();
  };
  const audioElementRef = useRef(null);

  // Function to handle audio playback
  const handleAudioPlayback = async (e) => {
    e.preventDefault();

    if (!audioElement) {
      await handleRead(e);
      return;
    }

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRead = async (e) => {
    e.preventDefault();
    setAudioLoading(true);
    let response = await fetch("/api/audio", {
      method: "POST",
      body: JSON.stringify({
        story: completion,
        language: resultLanguage,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const blob = await response.blob();
    const audio = new Audio(URL.createObjectURL(blob));
    setAudioElement(audio); // Store the audio element in the state
    audioElementRef.current = audio; // Store the audio element in the ref
    setAudioLoading(false);
    audio.play();

    // Update the audio playback state when audio is finished playing
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    setIsPlaying(true);
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handlePressSubmit}>
        <div>
          <label
            htmlFor="style"
            className="block text-sm font-medium text-gray-700"
          >
            Style
          </label>
          <select
            id="style"
            name="style"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formState.style}
            onChange={(e) =>
              setFormState({ ...formState, style: e.target.value })
            }
          >
            <option value="fun">Fun</option>
            <option value="fairy">Fairytale</option>
            <option value="adventure">Adventure</option>
          </select>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <label
              htmlFor="characters"
              className="text-sm font-medium text-gray-700"
            >
              Characters
            </label>
            <button
              id="characters"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => setIsOpen(true)}
              disabled={max}
            >
              Add Character
            </button>
            <button
              id="clear"
              className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => clearCharacters(true)}
              disabled={max}
            >
              Clear
            </button>
          </div>
          <div className="flex items-center space-x-4">
            {
              <ul>
                {formState?.characters.map((character) => (
                  <li key={character.id}>{character.name}</li>
                ))}
              </ul>
            }
          </div>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formState.location}
              onChange={(e) =>
                setFormState({ ...formState, location: e.target.value })
              }
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700"
          >
            Language
          </label>
          <select
            id="language"
            name="language"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formState.language}
            onChange={(e) =>
              setFormState({ ...formState, language: e.target.value })
            }
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="russian">Russian</option>
          </select>
        </div>
        <div>
          {isReady ? (
            <div>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Generate New Story
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1"
                onClick={handleAudioPlayback}
              >
                {auioLoading ? "Loading..." : isPlaying ? "Pause" : "Read"}
                {/* {isPlaying  ? "Pause" : "Read"} Play/Pause button */}
              </button>
            </div>
          ) : isLoading ? (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleStop}
            >
              Stop
            </button>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={isLoading}
            >
              Submit
            </button>
          )}
        </div>
        <output>{completion}</output>
      </form>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Characters characters={characters} addCharacter={addCharacter} />
      </Modal>
    </div>
  );
}
