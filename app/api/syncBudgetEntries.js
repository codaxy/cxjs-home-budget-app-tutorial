import {database} from './app';
import uuid from 'uuid';

export async function syncBudgetEntries(budgetId, entries, lastSyncTimestamp) {
    let ref = database.ref(`budgetEntries/${budgetId}`);

    let fbEntries = await ref
        .orderByChild('timestamp')
        .startAt(lastSyncTimestamp)
        .once('value')
        .then(snapshot => snapshot.val() || {});

    let newEntries = [...entries];

    let dirty = false;

    newEntries.forEach((e, index) => {
        if (!e.timestamp)
            e.timestamp = Date.now();

        if (!e.id)
            e.id = uuid();

        if (e.timestamp > lastSyncTimestamp) {
            if (!fbEntries[e.id] || fbEntries[e.id].timestamp < e.timestamp)
                ref.child(e.id).set(e);
            else if (fbEntries[e.id].timestamp > e.timestamp) {
                newEntries[index] = fbEntries[e.id];
                dirty = true;
            }
        }

        delete fbEntries[e.id];
    });

    for (let key in fbEntries) {
        let index = newEntries.indexOf(a => a.id == key);
        if (index == -1)
            newEntries.push(fbEntries[key]);
        else
            newEntries[index] = fbEntries[key];
        dirty = true;
    }

    return dirty ? newEntries : entries;
}

export function watchBudgetEntries(budgetId, callback) {
    let ref = database.ref(`budgetEntries/${budgetId}`);
    ref.on('value', callback);
    return function () {
        ref.off('value', callback)
    }
}
