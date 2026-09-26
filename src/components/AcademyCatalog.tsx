import React, { useState } from 'react';
import { Course, Lesson } from '../types';
import { COURSES, ASSETS } from '../data/mockData';
import {
  BookOpen,
  CheckCircle,
  PlayCircle,
  Clock,
  Users,
  Star,
  ChevronRight,
  ShieldCheck,
  Award,
  ArrowRight,
  Check,
  X,
  FileText,
} from 'lucide-react';

interface AcademyCatalogProps {
  onStartTrading: () => void;
  onSelectSignals: () => void;
}

export const AcademyCatalog: React.FC<AcademyCatalogProps> = ({
  onStartTrading,
  onSelectSignals,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({
    'pa-1': true,
  });

  const levels = ['All', 'Foundations', 'Intermediate', 'Advanced Institutional'];

  const filteredCourses =
    selectedLevel === 'All'
      ? COURSES
      : COURSES.filter((c) => c.level === selectedLevel);

  const handleOpenCourse = (course: Course) => {
    setActiveCourse(course);
    setActiveLesson(course.lessons[0] || null);
    setSelectedQuizAnswer(null);
    setIsQuizSubmitted(false);
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setSelectedQuizAnswer(null);
    setIsQuizSubmitted(false);
  };

  const handleToggleComplete = (lessonId: string) => {
    setCompletedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-6 sm:p-10 lg:p-12 shadow-md">
        <div className="absolute inset-0 opacity-25 mix-blend-luminosity overflow-hidden">
          <img
            src={ASSETS.heroFloor}
            alt="HA Trader Institutional Trading Floor"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-105"
          />
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>INSTITUTIONAL CURRICULUM · FOUNDED BY HARIS AHMAD</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Trade with the Banks, Not Against Them.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            HA Trader Academy bridges the gap between confusing retail folklore and surgical institutional smart money concepts. Master pure price action, liquidity engineering, and rigorous risk control.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => handleOpenCourse(COURSES[0])}
              className="px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Explore Masterclass</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onStartTrading}
              className="px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200 bg-slate-800/80 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <PlayCircle className="w-4 h-4 text-emerald-400" />
              <span>Launch Live Simulator</span>
            </button>
          </div>

          {/* Social Proof & Metrics */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-300 text-xs font-mono">
            <div>
              <div className="text-xl sm:text-2xl font-black text-white tabular-nums">11,000+</div>
              <div className="text-[11px] text-slate-400 font-sans">Active Students</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white tabular-nums">4.92 / 5</div>
              <div className="text-[11px] text-slate-400 font-sans">Verified Rating</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 tabular-nums">$14.2M+</div>
              <div className="text-[11px] text-slate-400 font-sans">Prop Funded Capital</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-blue-400 tabular-nums">85%</div>
              <div className="text-[11px] text-slate-400 font-sans">Challenge Pass Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Tracks Filter Bar */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Curriculum Tracks & Courses
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Select a specialization track designed from foundational chart reading to institutional execution.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none">
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedLevel === lvl
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            return (
              <div
                key={course.id}
                className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-500/40 transition-all"
              >
                {/* Image Container with Safe Fallback */}
                <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-slate-900/80 backdrop-blur-sm text-blue-400 border border-blue-500/20">
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                      {course.lessonCount} Modules
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold mb-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{course.rating}</span>
                      <span className="text-slate-400 font-normal">({course.enrolledStudents.toLocaleString()} students)</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenCourse(course)}
                      className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Enter Syllabus</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Course Detail Modal / Syllabus Drawer */}
      {activeCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/70">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                  {activeCourse.level} Track
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {activeCourse.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveCourse(null)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Split Arena: Lessons list (Left) + Selected Lesson Content & Quiz (Right) */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-y-auto">
              {/* Left Column: Lesson Modules */}
              <div className="md:col-span-4 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
                  Course Modules ({activeCourse.lessons.length})
                </h4>
                {activeCourse.lessons.map((lesson, idx) => {
                  const isSelected = activeLesson?.id === lesson.id;
                  const isDone = completedLessons[lesson.id];
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => handleSelectLesson(lesson)}
                      className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isDone
                            ? isSelected
                              ? 'bg-white text-blue-600'
                              : 'bg-emerald-500 text-white'
                            : isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {isDone ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold line-clamp-1">{lesson.title}</p>
                        <p
                          className={`text-[11px] font-mono mt-0.5 ${
                            isSelected ? 'text-blue-100' : 'text-slate-400'
                          }`}
                        >
                          {lesson.duration}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Detailed Lesson Viewer */}
              {activeLesson && (
                <div className="md:col-span-8 p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-blue-600 dark:text-blue-400 font-bold">
                        Duration: {activeLesson.duration}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                        {activeLesson.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleToggleComplete(activeLesson.id)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                        completedLessons[activeLesson.id]
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                          : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{completedLessons[activeLesson.id] ? 'Completed' : 'Mark as Done'}</span>
                    </button>
                  </div>

                  {/* Core Content Notes */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Technical Concept Breakdown
                    </h4>
                    <div className="space-y-2.5">
                      {activeLesson.content.map((p, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strict Execution Rules */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Master Trader Checklist & Execution Rules
                    </h4>
                    <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 space-y-2">
                      {activeLesson.keyRules.map((rule, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-800 dark:text-blue-100">
                          <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Chapter Quiz */}
                  {activeLesson.quiz && activeLesson.quiz.length > 0 && (
                    <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 space-y-4">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-500" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                          Knowledge Assessment Quiz
                        </h4>
                      </div>

                      {activeLesson.quiz.map((q) => (
                        <div key={q.id} className="space-y-3">
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                            {q.question}
                          </p>

                          <div className="space-y-2">
                            {q.options.map((option, oIdx) => {
                              const isSelected = selectedQuizAnswer === oIdx;
                              let btnStyle =
                                'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300';
                              if (isQuizSubmitted) {
                                if (oIdx === q.correctIndex) {
                                  btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold';
                                } else if (isSelected && isSelected !== (oIdx === q.correctIndex)) {
                                  btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400';
                                }
                              } else if (isSelected) {
                                btnStyle = 'border-blue-600 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold';
                              }

                              return (
                                <button
                                  key={oIdx}
                                  disabled={isQuizSubmitted}
                                  onClick={() => setSelectedQuizAnswer(oIdx)}
                                  className={`w-full text-left p-3 rounded-lg border text-xs transition-colors cursor-pointer flex items-center justify-between ${btnStyle}`}
                                >
                                  <span>{option}</span>
                                  {isQuizSubmitted && oIdx === q.correctIndex && (
                                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {!isQuizSubmitted ? (
                            <button
                              disabled={selectedQuizAnswer === null}
                              onClick={() => setIsQuizSubmitted(true)}
                              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 disabled:opacity-50 hover:bg-blue-700 rounded-lg cursor-pointer"
                            >
                              Verify Answer
                            </button>
                          ) : (
                            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs space-y-1">
                              <p className="font-bold text-slate-900 dark:text-white">
                                {selectedQuizAnswer === q.correctIndex ? '✓ Correct!' : '✕ Incorrect'}
                              </p>
                              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                {q.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
