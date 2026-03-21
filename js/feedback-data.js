const feedbackData = {

  save(entry) {
    const all = this.getAll();
    entry.id = Date.now();
    entry.date = new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
    all.unshift(entry);
    localStorage.setItem('pangako_feedback', JSON.stringify(all));
    return entry;
  },

  getAll() {
    const stored = localStorage.getItem('pangako_feedback');
    return stored ? JSON.parse(stored) : [];
  },

  clear() {
    localStorage.removeItem('pangako_feedback');
  }

};
