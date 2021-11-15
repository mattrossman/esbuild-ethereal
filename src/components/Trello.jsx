import { useState, useEffect } from "react"
import { io } from "socket.io-client"

const server = "https://cisco-trello-server.herokuapp.com/"

function useRealtimeBoard(boardId) {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const socket = io(server + boardId)
    socket.on("message", (data) => setBoard(data))
  }, [])
  return board
}

export function Trello({ boardId }) {
  const board = useRealtimeBoard(boardId)
  return (
    <div class="grid grid-flow-col auto-cols-fr gap-3 items-start">
      {board?.map((list) => (
        <div xr-layer data-type="list" class="bg-gray-300 rounded-lg px-2 py-3 w-[272px]">
          <h1 class="font-bold mx-1 mb-2">{list.name}</h1>
          <ul class="flex flex-col gap-1">
            {list.cards.map((card) => (
              <li
                xr-layer
                data-type="card"
                data-id={card.id}
                class="bg-gray-100 rounded p-2 shadow-sm text-sm"
                onClick={(e) => {
                  console.log("click")
                  window.selectedLayer = e.currentTarget
                }}
              >
                <p class="mb-1">{card.name}</p>
                <div class="flex">
                  {card.badges.description && <Badge>≡</Badge>}
                  {card.badges.comments > 0 && (
                    <Badge>
                      🗨 <span>{card.badges.comments}</span>
                    </Badge>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function Badge(props) {
  return <span class="text-gray-700 mr-2 text-xs" {...props} />
}
