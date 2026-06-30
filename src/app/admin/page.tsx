"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Inquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  development_type: string;
  budget: string | null;
  message: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Load password from sessionStorage on mount
  useEffect(() => {
    const savedPassword = sessionStorage.getItem("admin_password");
    if (savedPassword) {
      verifyPassword(savedPassword);
    }
  }, []);

  const verifyPassword = async (pass: string) => {
    setIsLoading(true);
    setLoginError("");
    try {
      const res = await fetch(`/api/inquiries?password=${encodeURIComponent(pass)}`);
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
        setIsAuthenticated(true);
        sessionStorage.setItem("admin_password", pass);
      } else {
        const errData = await res.json();
        setLoginError(errData.error || "비밀번호가 올바르지 않습니다.");
        sessionStorage.removeItem("admin_password");
      }
    } catch (err) {
      setLoginError("서버와의 통신에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setLoginError("비밀번호를 입력해 주세요.");
      return;
    }
    verifyPassword(password);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_password");
    setIsAuthenticated(false);
    setInquiries([]);
    setPassword("");
  };

  // Helper to format date
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(
      d.getHours()
    ).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  // Type label formatter
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "web":
        return { text: "웹 개발", color: "bg-blue-50 text-blue-700 border-blue-200" };
      case "app":
        return { text: "앱 개발", color: "bg-indigo-50 text-indigo-700 border-indigo-200" };
      case "firmware":
        return { text: "펌웨어 / 임베디드", color: "bg-purple-50 text-purple-700 border-purple-200" };
      case "maintenance":
        return { text: "유지보수 & 기술지원", color: "bg-teal-50 text-teal-700 border-teal-200" };
      default:
        return { text: type || "기타", color: "bg-gray-50 text-gray-700 border-gray-200" };
    }
  };

  // Budget label formatter
  const getBudgetLabel = (val: string | null) => {
    if (!val) return "미정";
    switch (val) {
      case "under100":
        return "100만원 미만";
      case "100-300":
        return "100~300만원";
      case "300-500":
        return "300~500만원";
      case "500-1000":
        return "500~1000만원";
      case "over1000":
        return "1000만원 이상";
      default:
        return val;
    }
  };

  // Filters & Search logic
  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterType === "all" || item.development_type === filterType;

    return matchesSearch && matchesFilter;
  });

  // Calculate statistics
  const stats = {
    total: inquiries.length,
    web: inquiries.filter((item) => item.development_type === "web").length,
    app: inquiries.filter((item) => item.development_type === "app").length,
    firmware: inquiries.filter((item) => item.development_type === "firmware").length,
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-teal-light p-6 font-sans">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-navy to-navy-mid rounded-xl flex items-center justify-center font-en font-extrabold text-sm text-white tracking-tight mb-3">
              A&N
            </div>
            <h1 className="text-xl font-bold text-navy tracking-tight">A&N Dev 관리자 페이지</h1>
            <p className="text-sm text-gray-400 mt-1">프로젝트 문의 목록 확인을 위한 로그인</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="pass" className="text-xs font-semibold text-navy">
                관리자 비밀번호
              </label>
              <input
                type="password"
                id="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="px-4 py-3 border border-gray-200 focus:border-teal focus:ring-3 focus:ring-teal/12 rounded-lg text-sm bg-white outline-none transition-all"
                disabled={isLoading}
              />
            </div>

            {loginError && <p className="text-xs text-red-500 font-medium">{loginError}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-navy to-navy-mid text-white font-bold text-sm py-3.5 px-4 rounded-lg cursor-pointer transition-all duration-300 hover:opacity-90 disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>인증 중...</span>
                </>
              ) : (
                <span>로그인</span>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-navy to-navy-mid rounded-lg flex items-center justify-center font-en font-extrabold text-[0.72rem] text-white tracking-tight">
              A&N
            </div>
            <div className="flex flex-col leading-tight">
              <h1 className="font-bold text-lg text-navy tracking-tight">관리자 대시보드</h1>
              <span className="text-xs text-gray-400 font-normal">A&N Dev | 고객 문의 내역 관리</span>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-gray-200 hover:border-red-300 hover:text-red-600 rounded-lg text-xs font-semibold text-gray-500 bg-white transition-colors cursor-pointer ml-auto sm:ml-0"
          >
            로그아웃
          </button>
        </header>

        {/* Stats widgets */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            <span className="text-[0.75rem] font-bold text-gray-400 tracking-wider">누적 문의 건수</span>
            <span className="text-3xl font-extrabold text-navy mt-1">{stats.total}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            <span className="text-[0.75rem] font-bold text-gray-400 tracking-wider">웹 개발</span>
            <span className="text-3xl font-extrabold text-blue-600 mt-1">{stats.web}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            <span className="text-[0.75rem] font-bold text-gray-400 tracking-wider">앱 개발</span>
            <span className="text-3xl font-extrabold text-indigo-600 mt-1">{stats.app}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            <span className="text-[0.75rem] font-bold text-gray-400 tracking-wider">펌웨어 / 임베디드</span>
            <span className="text-3xl font-extrabold text-purple-600 mt-1">{stats.firmware}</span>
          </div>
        </div>

        {/* Filter and search bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-full md:max-w-xs relative">
            <input
              type="text"
              placeholder="이름, 이메일, 내용 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 focus:border-teal rounded-lg text-sm bg-white outline-none transition-colors"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-navy hidden md:inline">분야 필터:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full md:w-auto px-3.5 py-2 border border-gray-200 focus:border-teal rounded-lg text-sm bg-white outline-none cursor-pointer"
            >
              <option value="all">전체 분야</option>
              <option value="web">웹 개발</option>
              <option value="app">앱 개발</option>
              <option value="firmware">펌웨어 / 임베디드</option>
              <option value="maintenance">유지보수 & 기술지원</option>
              <option value="other">기타</option>
            </select>
          </div>
        </div>

        {/* Inquiries List */}
        <main className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-gray-300">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              <p className="text-sm font-medium text-gray-400">해당하는 문의 내역이 없습니다.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <th className="py-4 px-6">접수 일시</th>
                    <th className="py-4 px-6">의뢰인 / 회사</th>
                    <th className="py-4 px-6">이메일</th>
                    <th className="py-4 px-6">개발 분야</th>
                    <th className="py-4 px-6">예상 예산</th>
                    <th className="py-4 px-6 text-right">상세</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredInquiries.map((item) => {
                    const typeLabel = getTypeLabel(item.development_type);
                    const isExpanded = expandedId === item.id;
                    return (
                      <React.Fragment key={item.id}>
                        <tr
                          onClick={() => setExpandedId(isExpanded ? null : item.id)}
                          className="hover:bg-gray-50/50 cursor-pointer transition-colors"
                        >
                          <td className="py-4 px-6 font-medium text-gray-500">{formatDate(item.created_at)}</td>
                          <td className="py-4 px-6 font-semibold text-navy">{item.name}</td>
                          <td className="py-4 px-6 text-gray-600">{item.email}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[0.72rem] font-semibold ${typeLabel.color}`}>
                              {typeLabel.text}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-600 font-medium">{getBudgetLabel(item.budget)}</td>
                          <td className="py-4 px-6 text-right">
                            <button className="text-teal hover:text-teal-dark font-semibold text-xs transition-colors">
                              {isExpanded ? "접기 ▲" : "보기 ▼"}
                            </button>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="bg-gray-50/40">
                            <td colSpan={6} className="py-5 px-8">
                              <div className="flex flex-col gap-4 border-l-2 border-teal pl-4">
                                <div className="flex flex-col gap-1">
                                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">프로젝트 설명</span>
                                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap mt-1">{item.message}</p>
                                </div>
                                
                                <div className="flex gap-4 mt-2">
                                  <a
                                    href={`mailto:${item.email}?subject=[A%26N%20Dev]%20안녕하세요%2C%20의뢰해%20주신%20내용%20관련%20연락드립니다.`}
                                    className="inline-flex items-center gap-1.5 bg-navy text-white text-xs font-bold py-2 px-4 rounded-lg hover:bg-teal-dark transition-colors cursor-pointer"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                      <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                    이메일 회신
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
