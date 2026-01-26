import React, { useState } from "react";
import { BookOpen, Database, Code, Search, ChevronRight, Copy, Key, ExternalLink, Edit2, Check, X, Terminal } from "lucide-react";

const Documentation = () => {
  const [activeTab, setActiveTab] = useState("endpoints");
  const [editingFunc, setEditingFunc] = useState(null);
  const [editedParams, setEditedParams] = useState({});
  const [liveExampleUrl, setLiveExampleUrl] = useState("");

  const initialSqlFunctions = [
    {
      id: 1,
      name: "get_games",
      description: "Вывод списка всех игр",
      params: ["login (string)", "password (string)"],
      paramValues: ["bob456", "pass2"],
      exampleUrl: "https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=get_games",
      response: `{
  "game_id": 31,
  "players_count": 2
}`
    },
    {
      id: 1,
      name: "login_user",
      description: "Вход в существующий аккаунт",
      params: ["login (string)", "password (string)"],
      paramValues: ["bob456", "pass2"],
      exampleUrl: "https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=login_user&p=[%22bob456%22,%22pass2%22]",
      response: `{
  "status": "ok",
  "login": "user_123",
  "token": 1522468386
}`
    },
    {
      id: 2,
      name: "register_user",
      description: "Регистрация нового пользователя",
      params: ["login (string)", "password (string)"],
      paramValues: ["bob456", "pass2"],
      exampleUrl: "https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=register_user&p=[%22bob456%22,%22pass2%22]",
      response: `{
  "status": "ok",
  "message": "Registration successful",
  "login": "user_123"
}`
    },
    {
      id: 3,
      name: "get_games",
      description: "Вывод списка игр",
      params: ["login (string)", "password (string)", "gamePassword (string)", "teamColor ('red' | 'blue')", "role ('player' | 'leader')", "playerName (string)"],
      paramValues: ["alice123", "pass1", "gamepass", "blue", "leader", "Alice"],
      exampleUrl: "https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=create_game&p=[%22alice123%22,%22pass1%22,%22gamepass%22,%22blue%22,%22leader%22,%22Alice%22]",
      response: `{
  "game_id": 24,
  "team_id": 32,
  "role": "leader"
}`
    },
    {
      id: 4,
      name: "join_game",
      description: "Вход в существующую игру",
      params: ["login (string)", "password (string)", "gameID (int)", "gamePassword (string)", "teamColor ('red' | 'blue')", "role ('player' | 'leader')", "playerName (string)"],
      paramValues: ["bob456", "pass2", "1", "gamepass", "blue", "player", "Alice"],
      exampleUrl: "https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=join_game&p=[%22bob456%22,%22pass2%22,25,%22gamepass%22,%22blue%22,%22player%22,%22Alice%22]",
      response: `{
  "status": "success",
  "player_id": 123,
  "team": "red",
  "role": "player"
}`
    },
    {
      id: 5,
      name: "create_game",
      description: "Создание новой игры",
      params: ["login (string)", "password (string)", "gamePassword (string)", "teamColor ('red' | 'blue')", "role ('player' | 'leader')", "playerName (string)"],
      paramValues: ["alice123", "pass1", "gamepass", "blue", "leader", "Alice"],
      exampleUrl: "https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=create_game&p=[%22alice123%22,%22pass1%22,%22gamepass%22,%22blue%22,%22leader%22,%22Alice%22]",
      response: `{
  "game_id": 24,
  "team_id": 32,
  "role": "leader"
}`
    },
    {
      id: 6,
      name: "get_game_state",
      description: "Получение текущего состояния игры",
      params: ["login (string)", "password (string)", "gameID (int)", "gamePassword (string)"],
      paramValues: ["alice123", "pass1", "1", "alpha123"],
      exampleUrl: "https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=get_game_state&p=[%22alice123%22,%22pass1%22,1,%22alpha123%22]",
      response: `{
  "game_id": 1,
  "time_left": "00:00:00",
  "game_over": true,
  "teams": [...]
}`
    },
    {
      id: 7,
      name: "submit_hint",
      description: "Отправка подсказки капитаном",
      params: ["login (string)", "password (string)", "gameID (int)", "gamePassword (string)", "hint (string)"],
      paramValues: ["alice123", "pass1", "25", "gamepass", "кот суп лук"],
      exampleUrl: "https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=submit_hint&p=[%22alice123%22,%22pass1%22,25,%22gamepass%22,%22кот суп лук%22]",
      response: `{
  "status": "success",
  "team_id": 2,
  "hint": "кошка стул книга",
  "phase":
    "phase_end_time":	"2026-01-16T16:24:59.845254"
}`
    },
    {
      id: 8,
      name: "submit_guess",
      description: "Отправка догадки игроком",
      params: ["login (string)", "password (string)", "gameID (int)", "gamePassword (string)", "guess (int)"],
      paramValues: ["alice123", "pass1", "1", "alpha123", "123"],
      exampleUrl: "https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=submit_guess&p=[%22alice123%22,%22pass1%22,1,%22alpha123%22,%22123%22]",
      response: `{
  "status": "success",
  "team_id": 2,
  "round_number": 1,
  "guess": 123,
  "intercept_token": 0,
  "disruption_token": 0
}`
    }
  ];

  const databaseTables = [
    {
      name: "users",
      description: "Таблица пользователей системы",
      columns: [
        { name: "id", type: "INT", nullable: "NOT NULL", key: "PK", description: "Уникальный идентификатор" },
        { name: "login", type: "VARCHAR(50)", nullable: "NOT NULL", key: "UNIQUE", description: "Логин пользователя" },
        { name: "password_hash", type: "VARCHAR(255)", nullable: "NOT NULL", key: "", description: "Хэш пароля" },
        { name: "created_at", type: "TIMESTAMP", nullable: "NOT NULL", key: "", description: "Дата создания" },
        { name: "last_login", type: "TIMESTAMP", nullable: "NULL", key: "", description: "Последний вход" },
      ]
    },
    {
      name: "games",
      description: "Таблица игровых сессий",
      columns: [
        { name: "id", type: "INT", nullable: "NOT NULL", key: "PK", description: "ID игры" },
        { name: "password", type: "VARCHAR(50)", nullable: "NOT NULL", key: "", description: "Пароль для входа в игру" },
        { name: "status", type: "ENUM('waiting', 'active', 'finished')", nullable: "NOT NULL", key: "", description: "Статус игры" },
        { name: "current_turn", type: "ENUM('red', 'blue')", nullable: "NOT NULL", key: "", description: "Чей сейчас ход" },
        { name: "created_by", type: "INT", nullable: "NOT NULL", key: "FK → users.id", description: "Создатель игры" },
        { name: "created_at", type: "TIMESTAMP", nullable: "NOT NULL", key: "", description: "Время создания" },
      ]
    },
    {
      name: "players",
      description: "Таблица игроков в конкретных играх",
      columns: [
        { name: "id", type: "INT", nullable: "NOT NULL", key: "PK", description: "ID записи" },
        { name: "game_id", type: "INT", nullable: "NOT NULL", key: "FK → games.id", description: "ID игры" },
        { name: "user_id", type: "INT", nullable: "NOT NULL", key: "FK → users.id", description: "ID пользователя" },
        { name: "team", type: "ENUM('red', 'blue')", nullable: "NOT NULL", key: "", description: "Команда игрока" },
        { name: "role", type: "ENUM('player', 'leader')", nullable: "NOT NULL", key: "", description: "Роль в команде" },
        { name: "player_name", type: "VARCHAR(50)", nullable: "NOT NULL", key: "", description: "Имя игрока в игре" },
        { name: "score", type: "INT", nullable: "NOT NULL DEFAULT 0", key: "", description: "Счет игрока" },
      ]
    },
    {
      name: "words",
      description: "Таблица слов в игре",
      columns: [
        { name: "id", type: "INT", nullable: "NOT NULL", key: "PK", description: "ID слова" },
        { name: "game_id", type: "INT", nullable: "NOT NULL", key: "FK → games.id", description: "ID игры" },
        { name: "word", type: "VARCHAR(100)", nullable: "NOT NULL", key: "", description: "Слово" },
        { name: "team", type: "ENUM('red', 'blue', 'neutral', 'black')", nullable: "NOT NULL", key: "", description: "Принадлежность слова" },
        { name: "position", type: "INT", nullable: "NOT NULL", key: "", description: "Позиция на поле" },
        { name: "revealed", type: "BOOLEAN", nullable: "NOT NULL DEFAULT false", key: "", description: "Раскрыто ли слово" },
        { name: "revealed_by", type: "ENUM('red', 'blue')", nullable: "NULL", key: "", description: "Кем раскрыто" },
      ]
    },
    {
      name: "hints",
      description: "Таблица подсказок",
      columns: [
        { name: "id", type: "INT", nullable: "NOT NULL", key: "PK", description: "ID подсказки" },
        { name: "game_id", type: "INT", nullable: "NOT NULL", key: "FK → games.id", description: "ID игры" },
        { name: "team", type: "ENUM('red', 'blue')", nullable: "NOT NULL", key: "", description: "Команда подсказки" },
        { name: "leader_id", type: "INT", nullable: "NOT NULL", key: "FK → players.id", description: "ID капитана" },
        { name: "hint_text", type: "VARCHAR(100)", nullable: "NOT NULL", key: "", description: "Текст подсказки" },
        { name: "number", type: "INT", nullable: "NOT NULL", key: "", description: "Количество слов" },
        { name: "created_at", type: "TIMESTAMP", nullable: "NOT NULL", key: "", description: "Время создания" },
      ]
    },
    {
      name: "guesses",
      description: "Таблица догадок игроков",
      columns: [
        { name: "id", type: "INT", nullable: "NOT NULL", key: "PK", description: "ID догадки" },
        { name: "game_id", type: "INT", nullable: "NOT NULL", key: "FK → games.id", description: "ID игры" },
        { name: "player_id", type: "INT", nullable: "NOT NULL", key: "FK → players.id", description: "ID игрока" },
        { name: "word_id", type: "INT", nullable: "NOT NULL", key: "FK → words.id", description: "ID слова" },
        { name: "hint_id", type: "INT", nullable: "NULL", key: "FK → hints.id", description: "ID подсказки" },
        { name: "created_at", type: "TIMESTAMP", nullable: "NOT NULL", key: "", description: "Время догадки" },
        { name: "correct", type: "BOOLEAN", nullable: "NULL", key: "", description: "Правильность догадки" },
      ]
    }
  ];

  const [sqlFunctions, setSqlFunctions] = useState(initialSqlFunctions);

  const TableColumn = ({ column }) => (
    <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
      <td className="py-2 px-3">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-sm font-semibold text-slate-900">{column.name}</span>
          {column.key.includes("PK") && (
            <span className="inline-flex items-center px-1 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800">
              <Key className="w-2.5 h-2.5 mr-0.5" /> PK
            </span>
          )}
          {column.key.includes("FK") && (
            <span className="inline-flex items-center px-1 py-0.5 rounded text-[9px] font-bold bg-purple-100 text-purple-800">
              <Key className="w-2.5 h-2.5 mr-0.5" /> FK
            </span>
          )}
          {column.key === "UNIQUE" && (
            <span className="inline-flex items-center px-1 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-800">
              UNIQUE
            </span>
          )}
        </div>
        <div className="text-xs text-slate-500 mt-1">{column.description}</div>
      </td>
      <td className="py-2 px-3">
        <code className="font-mono text-xs text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
          {column.type}
        </code>
      </td>
      <td className="py-2 px-3">
        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
          column.nullable === "NOT NULL" 
            ? "bg-red-100 text-red-800" 
            : "bg-emerald-100 text-emerald-800"
        }`}>
          {column.nullable}
        </span>
      </td>
      <td className="py-2 px-3">
        {column.key && !column.key.includes("PK") && !column.key.includes("FK") && column.key !== "UNIQUE" ? (
          <span className="text-xs text-slate-500 italic">{column.key}</span>
        ) : column.key && column.key.includes("FK") ? (
          <span className="text-xs text-purple-600 font-medium">{column.key}</span>
        ) : null}
      </td>
    </tr>
  );

  const handleStartEdit = (funcId) => {
    setEditingFunc(funcId);
    const func = sqlFunctions.find(f => f.id === funcId);
    const initialParams = {};
    func.params.forEach((param, index) => {
      initialParams[index] = func.paramValues[index] || "";
    });
    setEditedParams(initialParams);
    generateLiveUrl(func, initialParams);
  };

  const handleCancelEdit = () => {
    setEditingFunc(null);
    setEditedParams({});
  };

  const handleSaveEdit = (funcId) => {
    const func = sqlFunctions.find(f => f.id === funcId);
    const updatedParamValues = func.params.map((_, index) => editedParams[index] || "");
    
    const encodedParams = encodeURIComponent(JSON.stringify(updatedParamValues));
    const newUrl = `https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=${func.name}&p=${encodedParams}`;
    
    const updatedFunctions = sqlFunctions.map(f => 
      f.id === funcId 
        ? { 
            ...f, 
            paramValues: updatedParamValues,
            exampleUrl: newUrl 
          }
        : f
    );
    
    setSqlFunctions(updatedFunctions);
    setEditingFunc(null);
    setEditedParams({});
  };

  const handleParamChange = (funcId, paramIndex, value) => {
    const newParams = {
      ...editedParams,
      [paramIndex]: value
    };
    
    setEditedParams(newParams);
    
    const func = sqlFunctions.find(f => f.id === funcId);
    generateLiveUrl(func, newParams);
  };

  const generateLiveUrl = (func, params) => {
    const paramArray = func.params.map((_, index) => params[index] || "");
    const encodedParams = encodeURIComponent(JSON.stringify(paramArray));
    const url = `https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=${func.name}&p=${encodedParams}`;
    setLiveExampleUrl(url);
  };

  const getExampleUrl = (func) => {
    if (editingFunc === func.id && liveExampleUrl) {
      return liveExampleUrl;
    }
    return func.exampleUrl;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-700 font-sans flex">
      <aside className="w-72 bg-white border-r border-slate-200 p-6 flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Code className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">DevDocs</span>
        </div>

        <nav className="space-y-1 flex-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Ресурсы</p>
          {[
            { id: 'functions', label: 'SQL Функции', icon: Code },
            { id: 'database', label: 'База данных', icon: Database },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === item.id 
                ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Документация API</h1>
            <p className="text-slate-500 text-sm">Версия 2.0.0 • Последнее обновление: 17.01.2026</p>
          </div>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Поиск метода..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all w-96"
            />
          </div>
        </div>

        {activeTab === "database" ? (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <Database className="text-amber-600 w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Схема Базы Данных</h2>
                  <p className="text-slate-500 text-sm mt-0.5">Полная структура таблиц и связей</p>
                </div>
              </div>

              <div className="space-y-4">
                {databaseTables.map((table, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg overflow-hidden hover:border-indigo-300 transition-colors">
                    <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-slate-900 flex items-center gap-2">
                            <span className="font-mono text-sm">{table.name}</span>
                            <span className="text-xs font-normal bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                              Таблица
                            </span>
                          </h3>
                          <p className="text-slate-600 text-xs mt-0.5">{table.description}</p>
                        </div>
                        <div className="text-xs text-slate-500">
                          {table.columns.length} колонок
                        </div>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-100/50">
                          <tr className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                            <th className="py-2 px-3">Колонка</th>
                            <th className="py-2 px-3">Тип</th>
                            <th className="py-2 px-3">Nullable</th>
                            <th className="py-2 px-3">Ключи</th>
                          </tr>
                        </thead>
                        <tbody>
                          {table.columns.map((column, colIndex) => (
                            <TableColumn key={colIndex} column={column} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <h4 className="text-sm font-bold text-slate-700 mb-3">Легенда</h4>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800">
                      <Key className="w-2.5 h-2.5 mr-0.5" /> PK
                    </span>
                    <span className="text-xs text-slate-600">Первичный ключ</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-800">
                      <Key className="w-2.5 h-2.5 mr-0.5" /> FK
                    </span>
                    <span className="text-xs text-slate-600">Внешний ключ</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-800">
                      UNIQUE
                    </span>
                    <span className="text-xs text-slate-600">Уникальное</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-red-100 text-red-800">
                      NOT NULL
                    </span>
                    <span className="text-xs text-slate-600">Обязательное</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                      NULL
                    </span>
                    <span className="text-xs text-slate-600">Необязательное</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {sqlFunctions.map((func) => (
              <div key={func.id} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow transition-shadow overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="px-2.5 py-1.5 bg-indigo-50 border border-indigo-200 rounded-lg">
                        <Code className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <code className="text-base font-bold text-slate-900">{func.name}()</code>
                        <p className="text-slate-600 text-sm mt-0.5">{func.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {editingFunc === func.id ? (
                        <>
                          <button
                            onClick={() => handleSaveEdit(func.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-medium rounded-md transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Сохранить
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                            Отмена
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleStartEdit(func.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-medium rounded-md transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            Изменить параметры
                          </button>
                          <a 
                            href={getExampleUrl(func)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-medium rounded-md transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Выполнить
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Параметры функции</span>
                        <span className="text-slate-500 font-normal">{func.params.length} параметров</span>
                      </h4>
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 space-y-3">
                        {func.params.map((param, index) => (
                          <div key={index} className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-slate-700">{param}</span>
                              <span className="text-[10px] text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded">
                                #{index + 1}
                              </span>
                            </div>
                            {editingFunc === func.id ? (
                              <input
                                type="text"
                                value={editedParams[index] || ""}
                                onChange={(e) => handleParamChange(func.id, index, e.target.value)}
                                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
                                placeholder={`Введите значение для ${param.split(' ')[0]}`}
                              />
                            ) : (
                              <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded border border-slate-200">
                                <code className="text-sm text-indigo-600 font-mono">
                                  {func.paramValues[index]}
                                </code>
                                <span className="text-xs text-slate-400 italic">изменяемый</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        JSON Ответ
                      </h4>
                      <div className="bg-[#1e293b] rounded-lg p-4 border border-slate-800">
                        <pre className="text-xs text-emerald-400 font-mono leading-relaxed whitespace-pre-wrap">
                          {func.response}
                        </pre>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {editingFunc === func.id ? "Живая ссылка" : "Ссылка с параметрами"}
                      </h4>
                      <button
                        onClick={() => copyToClipboard(getExampleUrl(func))}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        Копировать
                      </button>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                      <code className="text-xs text-blue-300 font-mono break-all">
                        {getExampleUrl(func)}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Documentation;