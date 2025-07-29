const ConversationSection = () => {
  return (
    <div className="flex flex-col h-full">
      {/* 1. 채팅 기록 표시 영역 */}
      <div className="flex-grow overflow-y-auto p-4">
        {/* {messages.map((msg, index) => (
        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`p-3 rounded-lg max-w-xs ${msg.role === 'user' ? 'bg-green-200' : 'bg-gray-200'}`}>
            {msg.content}
          </div>
        </div>
      ))}
      {/* 2. 로딩 중일 때 '...' 인디케이터 표시 */}
        {/* {isLoading && <div>...</div>} */}
      </div>
      {/* 3. 메시지 입력 폼 */}
      <form className="p-4 flex">
        <input
          type="text"
          className="flex-grow border rounded-lg p-2"
          placeholder="메시지를 입력하세요..."
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
        >
          전송
        </button>
      </form>
    </div>
  );
};

export default ConversationSection;
