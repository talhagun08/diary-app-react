import { useState } from "react";
import {
  PlusCircle,
  Calendar,
  Search,
  Moon,
  Sun,
  Edit2,
  Trash2,
} from "lucide-react";
import "./App.css";

function DiaryApp() {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [selectedMood, setSelectedMood] = useState("😊");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const addEntry = () => {
    if (currentEntry.trim() && currentTitle.trim()) {
      const newEntry = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        title: currentTitle,
        content: currentEntry,
        mood: selectedMood,
      };
      setEntries([...entries, newEntry]);
      setCurrentEntry("");
      setCurrentTitle("");
      setSelectedMood("😊");
      setIsWriting(false);
    }
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const startEditing = (entry) => {
    setCurrentTitle(entry.title);
    setCurrentEntry(entry.content);
    setSelectedMood(entry.mood);
    setEditingId(entry.id);
    setIsWriting(true);
  };

  const saveEdit = () => {
    setEntries(
      entries.map((entry) =>
        entry.id === editingId
          ? {
              ...entry,
              title: currentTitle,
              content: currentEntry,
              mood: selectedMood,
            }
          : entry
      )
    );
    setEditingId(null);
    setCurrentEntry("");
    setCurrentTitle("");
    setSelectedMood("😊");
    setIsWriting(false);
  };
  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const moods = ["😊", "😢", "😴", "😍", "😡", "🤔", "😂", "😌"];
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 to-purple-50"
      }`}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Diary
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className=" absolute left-3 top-3 h-4 w-4 text-gray-400"></Search>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsWriting(!isWriting)}
              className="flex items-center gap-2 bg-blue-600 rounded-lg text-white px-4 py-2 hover:bg-blue-700 transition-colors"
            >
              <PlusCircle className="h-5 w-5" />
              New Save
            </button>
          </div>
        </div>
        {isWriting && (
          <div
            className={`mb-8 p-6 rounded-xl shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Save" : "Add New Save"}
            </h2>
            <input
              type="text"
              placeholder="Diary Title..."
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              className={`w-full p-3 rounded-lg border mb-4 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 placeholder-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <div className="mb-4">
              <label className=" block text-sm font-medium mb-2">My Mood</label>
              <div className="flex gap-2">
                {moods.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    className={`text-2xl p-2 rounded-lg transition-all ${
                      selectedMood === mood
                        ? "bg-blue-500 scale-110"
                        : isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              placeholder="What happen today?"
              value={currentEntry}
              onChange={(e) => {
                setCurrentEntry(e.target.value);
              }}
              rows={6}
              className={`w-full p-3 rounded-lg border resize-none ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 placeholder-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={editingId ? saveEdit : addEntry}
                disabled={!currentEntry.trim() || !currentTitle.trim()}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
              >
                {editingId ? "Update" : "Save"}
              </button>

              <button
                onClick={() => {
                  setIsWriting(false);
                  setEditingId(null);
                  setCurrentEntry("");
                  setCurrentTitle("");
                  setSelectedMood("😊");
                }}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className="space-y-4">
          {filteredEntries.length === 0 ? (
            <div
              className={`text-center py-12 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {searchTerm ? "No search results found" : "No entries yet"}
            </div>
          ) : (
            filteredEntries.map((entry) => {
              return (
                <div
                  key={entry.id}
                  className={`p-6 rounded-xl shadow-lg transition-all hover:shadow-xl ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{entry.mood}</span>
                      <div>
                        <h3 className="text-lg font-semibold">{entry.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {new Date(entry.date).toLocaleDateString("tr-TR")}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(entry)}
                        className={`p-2 rounded-lg transition-colors ${
                          isDarkMode
                            ? "hover:bg-gray-700 text-blue-400"
                            : "hover:bg-gray-100 text-blue-600"
                        }`}
                      >
                        <Edit2 className="h-4 w-4"></Edit2>
                      </button>
                      <button
                        onClick={() => {
                          deleteEntry(entry.id);
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                          isDarkMode
                            ? "hover:bg-gray-700 text-red-400"
                            : "hover:bg-gray-100 text-red-600"
                        }`}
                      >
                        <Trash2 className="h-4 w-4"></Trash2>
                      </button>
                    </div>
                  </div>
                  <p
                    className={`leading-relaxed ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {entry.content}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default DiaryApp;
