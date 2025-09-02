let data = [{ todolist: [] }];

function getAll() { return data; }
function getList() { return data[0].todolist; }
function nextId() { return (getList().reduce((m,t)=>Math.max(m,t.id),0) || 0) + 1; }

module.exports = { getAll, getList, nextId };
