import Sidebar from "./Sidebar";

export default function ChatPage() {
  return (
    <main className="ChatContainer bg-g4 flex h-full grow">
      <Sidebar />
      {/* Main Chat Area */}
      <div className="ChatMain flex flex-1 flex-col">
        <div className="ChatMessages flex-1 overflow-y-auto p-4">
          <div className="mx-auto max-w-3xl">
            <div className="MessageContainer flex flex-col gap-4">
              {/* Example message - will be replaced with dynamic content later */}
              <div className="Message bg-g5 rounded-lg p-4">
                <p className="text-g1">
                  Hello! I&apos;m Nova, your AI assistant. How can I help you
                  today?
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="ChatInput bg-g5 p-4">
          <div className="mx-auto max-w-3xl">
            <div className="InputContainer flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="border-g2 bg-n1 text-g4 focus:border-p1 flex-1 rounded-md border px-3 py-2 focus:outline-none"
              />
              <button className="SendButton bg-p1 hover:bg-p2 rounded-md px-4 py-2 text-white">
                Send
              </button>
            </div>
            <p className="text-g2 mt-2 text-center text-xs">
              Nova Assistant may produce inaccurate information about people,
              places, or facts.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
