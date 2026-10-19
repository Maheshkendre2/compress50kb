// Lightweight native IndexedDB utility for Recent (3) converted files
export interface RecentFileRecord {
  id: string;
  name: string;
  type: 'image' | 'pdf';
  originalSize: number;
  compressedSize: number;
  reductionPercentage: number;
  blob: Blob;
  timestamp: number;
}

const DB_NAME = 'compress50kb_db';
const DB_VERSION = 1;
const STORE_NAME = 'recent_files';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveRecentFile(record: RecentFileRecord): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    store.put(record);

    const allRecords: RecentFileRecord[] = await new Promise((resolve) => {
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });

    if (allRecords.length > 3) {
      allRecords.sort((a, b) => a.timestamp - b.timestamp);
      const toDelete = allRecords.slice(0, allRecords.length - 3);
      toDelete.forEach((item) => store.delete(item.id));
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('recent-files-updated'));
    }
  } catch (err) {
    console.warn('Recent storage note:', err);
  }
}

export async function getRecentFiles(): Promise<RecentFileRecord[]> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    return new Promise((resolve) => {
      const req = store.getAll();
      req.onsuccess = () => {
        const records: RecentFileRecord[] = req.result || [];
        records.sort((a, b) => b.timestamp - a.timestamp);
        resolve(records.slice(0, 3));
      };
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

export async function clearRecentFiles(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.clear();

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('recent-files-updated'));
    }
  } catch (err) {
    console.warn('Clear recent storage note:', err);
  }
}

