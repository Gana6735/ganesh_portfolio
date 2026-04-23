"use client";

import { useState } from 'react';
import { SaveBar } from '../SaveBar';

export const SectionContentEngines = ({ draft, updateDraft, save, discard, isDirty, saveStatus }: any) => {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillIcon, setNewSkillIcon] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Languages');

  // ── Video Resume ──────────────────────────────────────────
  const updateVideo = (key: string, value: any) =>
    updateDraft((prev: any) => ({ ...prev, video_resume: { ...prev.video_resume, [key]: value } }));

  const handleUrlChange = (url: string) => {
    updateDraft((prev: any) => {
      const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
      const match = url.match(regex);
      return {
        ...prev,
        video_resume: {
          ...prev.video_resume,
          youtube_url: url,
          youtube_id: match?.[1] ?? prev.video_resume.youtube_id
        }
      };
    });
  };

  // ── Skills ────────────────────────────────────────────────
  const addSkill = () => {
    if (!newSkillName) return;
    const newSkill = { id: Date.now(), name: newSkillName, category: newSkillCategory, iconUrl: newSkillIcon || null };
    updateDraft((prev: any) => ({ ...prev, skills: [...prev.skills, newSkill] }));
    setNewSkillName('');
    setNewSkillIcon('');
  };

  const removeSkill = (id: number) =>
    updateDraft((prev: any) => ({ ...prev, skills: prev.skills.filter((s: any) => s.id !== id) }));

  // ── Projects ──────────────────────────────────────────────
  const addProject = () => {
    const newProj = {
      id: Date.now(),
      title: 'New Project',
      description: 'Describe your project...',
      thumbnail: '',
      githubUrl: '',
      demoUrl: '',
      isPublished: false
    };
    updateDraft((prev: any) => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const updateProject = (id: number, field: string, value: any) =>
    updateDraft((prev: any) => ({
      ...prev,
      projects: prev.projects.map((p: any) => p.id === id ? { ...p, [field]: value } : p)
    }));

  const removeProject = (id: number) =>
    updateDraft((prev: any) => ({ ...prev, projects: prev.projects.filter((p: any) => p.id !== id) }));

  // ── Blogs ─────────────────────────────────────────────────
  const addBlog = () => {
    const newBlog = { id: Date.now(), title: 'New Blog Article', thumbnail: '', redirectUrl: '' };
    updateDraft((prev: any) => ({ ...prev, blogs: [...prev.blogs, newBlog] }));
  };

  const updateBlog = (id: number, field: string, value: any) =>
    updateDraft((prev: any) => ({
      ...prev,
      blogs: prev.blogs.map((b: any) => b.id === id ? { ...b, [field]: value } : b)
    }));

  const removeBlog = (id: number) =>
    updateDraft((prev: any) => ({ ...prev, blogs: prev.blogs.filter((b: any) => b.id !== id) }));

  const categories = ['Languages', 'GenAI/AI', 'Frameworks', 'Tools'];

  // ── render ────────────────────────────────────────────────
  return (
    <div className="space-y-12 animate-fade-in text-white pb-32">
      <h3 className="text-2xl font-bold text-industrial-cyan">Content Engines (CRUD Modules)</h3>

      {/* 1. Skills Marquee */}
      <div className="bg-black/30 p-6 rounded-xl border border-white/10 space-y-4">
        <h4 className="text-lg font-semibold border-b border-white/10 pb-2">Skills Marquee</h4>

        {/* Group skills by category */}
        {categories.map(cat => {
          const catSkills = draft.skills.filter((s: any) => s.category === cat);
          if (catSkills.length === 0) return null;
          return (
            <div key={cat} className="space-y-2">
              <p className="text-xs text-industrial-cyan uppercase tracking-widest font-bold pt-2">{cat}</p>
              {catSkills.map((skill: any) => (
                <div key={skill.id} className="flex items-center justify-between bg-black/50 p-3 rounded border border-white/10">
                  <div className="flex items-center gap-4">
                    {skill.iconUrl && <img src={skill.iconUrl} alt="icon" className="w-6 h-6 object-contain" />}
                    <span className="font-bold text-sm">{skill.name}</span>
                  </div>
                  <button onClick={() => removeSkill(skill.id)} className="text-red-400 hover:text-red-300 text-xs tracking-widest uppercase">Delete</button>
                </div>
              ))}
            </div>
          );
        })}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/10">
          <input
            type="text" placeholder="Skill Name" value={newSkillName} onChange={e => setNewSkillName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addSkill()}
            className="bg-black/50 border border-white/20 p-2 rounded focus:border-industrial-cyan outline-none text-sm"
          />
          <select
            value={newSkillCategory} onChange={e => setNewSkillCategory(e.target.value)}
            className="bg-black/50 border border-white/20 p-2 rounded focus:border-industrial-cyan outline-none text-sm"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            type="text" placeholder="Icon URL (optional)" value={newSkillIcon} onChange={e => setNewSkillIcon(e.target.value)}
            className="bg-black/50 border border-white/20 p-2 rounded focus:border-industrial-cyan outline-none text-sm"
          />
          <button onClick={addSkill} className="px-4 bg-industrial-cyan text-black font-bold uppercase rounded text-sm hover:scale-105 transition-transform">Add Skill</button>
        </div>
      </div>

      {/* 2. Project Factory */}
      <div className="bg-black/30 p-6 rounded-xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h4 className="text-lg font-semibold">Project Factory</h4>
          <button onClick={addProject} className="px-4 py-1 bg-industrial-cyan text-black text-xs font-bold uppercase rounded hover:scale-105 transition-transform">+ New Project</button>
        </div>
        <div className="space-y-6">
          {draft.projects.map((project: any) => (
            <div key={project.id} className="bg-black/50 p-4 rounded-xl border border-white/10 space-y-4">
              <div className="flex justify-between items-center">
                <input
                  type="text" value={project.title} onChange={e => updateProject(project.id, 'title', e.target.value)}
                  className="bg-transparent border-b border-white/20 text-xl font-bold focus:border-industrial-cyan outline-none w-1/2"
                />
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-xs uppercase tracking-widest text-white/50">{project.isPublished ? 'Published' : 'Draft'}</span>
                    <input type="checkbox" checked={project.isPublished} onChange={e => updateProject(project.id, 'isPublished', e.target.checked)} className="w-4 h-4 accent-industrial-cyan bg-black" />
                  </label>
                  <button onClick={() => removeProject(project.id)} className="text-red-400 hover:text-red-300 text-xs uppercase tracking-widest ml-4">Delete</button>
                </div>
              </div>
              <textarea
                placeholder="Description (Markdown supported)" value={project.description} onChange={e => updateProject(project.id, 'description', e.target.value)}
                className="w-full bg-black/40 border border-white/10 p-3 rounded text-sm focus:border-industrial-cyan outline-none h-24 resize-none"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" placeholder="Thumbnail URL" value={project.thumbnail} onChange={e => updateProject(project.id, 'thumbnail', e.target.value)} className="bg-black/40 border border-white/10 p-2 rounded text-xs focus:border-industrial-cyan outline-none" />
                <input type="text" placeholder="GitHub Link" value={project.githubUrl} onChange={e => updateProject(project.id, 'githubUrl', e.target.value)} className="bg-black/40 border border-white/10 p-2 rounded text-xs focus:border-industrial-cyan outline-none" />
                <input type="text" placeholder="Live Demo Link" value={project.demoUrl} onChange={e => updateProject(project.id, 'demoUrl', e.target.value)} className="bg-black/40 border border-white/10 p-2 rounded text-xs focus:border-industrial-cyan outline-none" />
              </div>
            </div>
          ))}
          {draft.projects.length === 0 && <p className="text-white/40 text-sm italic">No projects added yet.</p>}
        </div>
      </div>

      {/* 3. Blog Engine */}
      <div className="bg-black/30 p-6 rounded-xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h4 className="text-lg font-semibold">Blog &amp; Article Engine</h4>
          <button onClick={addBlog} className="px-4 py-1 bg-industrial-cyan text-black text-xs font-bold uppercase rounded hover:scale-105 transition-transform">+ New Article</button>
        </div>
        <div className="space-y-4">
          {draft.blogs.map((blog: any) => (
            <div key={blog.id} className="bg-black/50 p-4 rounded-xl border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="col-span-4">
                <input type="text" placeholder="Article Title" value={blog.title} onChange={e => updateBlog(blog.id, 'title', e.target.value)} className="w-full bg-transparent border-b border-white/20 font-bold focus:border-industrial-cyan outline-none" />
              </div>
              <div className="col-span-3">
                <input type="text" placeholder="Thumbnail URL" value={blog.thumbnail} onChange={e => updateBlog(blog.id, 'thumbnail', e.target.value)} className="w-full bg-black/40 border border-white/10 p-2 rounded text-xs focus:border-industrial-cyan outline-none" />
              </div>
              <div className="col-span-4">
                <input type="text" placeholder="Redirect URL (Medium/LinkedIn)" value={blog.redirectUrl} onChange={e => updateBlog(blog.id, 'redirectUrl', e.target.value)} className="w-full bg-black/40 border border-white/10 p-2 rounded text-xs focus:border-industrial-cyan outline-none" />
              </div>
              <div className="col-span-1 text-right">
                <button onClick={() => removeBlog(blog.id)} className="text-red-400 hover:text-red-300 text-xs uppercase tracking-widest">Delete</button>
              </div>
            </div>
          ))}
          {draft.blogs.length === 0 && <p className="text-white/40 text-sm italic">No blogs added yet.</p>}
        </div>
      </div>

      {/* 4. Video Resume */}
      <div className="bg-black/30 p-6 rounded-xl border border-white/10 space-y-4">
        <h4 className="text-lg font-semibold border-b border-white/10 pb-2">Video Resume Manager</h4>
        <div>
          <label className="text-xs text-white/50 uppercase tracking-widest block mb-2">YouTube URL</label>
          <input
            type="text" value={draft.video_resume.youtube_url || ''} onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full bg-black/50 border border-white/20 p-3 rounded text-white focus:border-industrial-cyan outline-none"
          />
          {draft.video_resume.youtube_id && <p className="text-xs text-green-400 mt-2">Extracted ID: {draft.video_resume.youtube_id}</p>}
        </div>
        <div>
          <label className="text-xs text-white/50 uppercase tracking-widest block mb-2">Video Title</label>
          <input type="text" value={draft.video_resume.title} onChange={(e) => updateVideo('title', e.target.value)} className="w-full bg-black/50 border border-white/20 p-3 rounded text-white focus:border-industrial-cyan outline-none" />
        </div>
        <div>
          <label className="text-xs text-white/50 uppercase tracking-widest block mb-2">Description</label>
          <textarea value={draft.video_resume.description} onChange={(e) => updateVideo('description', e.target.value)} className="w-full bg-black/50 border border-white/20 p-3 rounded text-white focus:border-industrial-cyan outline-none h-24 resize-none" />
        </div>
        <div className="flex gap-8 mt-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="font-mono text-sm">Autoplay</span>
            <input type="checkbox" checked={draft.video_resume.autoplay} onChange={(e) => updateVideo('autoplay', e.target.checked)} className="w-4 h-4 accent-industrial-cyan bg-black" />
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="font-mono text-sm">Show Controls</span>
            <input type="checkbox" checked={draft.video_resume.show_controls} onChange={(e) => updateVideo('show_controls', e.target.checked)} className="w-4 h-4 accent-industrial-cyan bg-black" />
          </label>
        </div>
      </div>

      <SaveBar variant="inline" isDirty={isDirty} saveStatus={saveStatus} onSave={save} onDiscard={discard} />
    </div>
  );
};
