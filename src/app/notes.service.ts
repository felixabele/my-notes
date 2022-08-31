import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, onSnapshot, QuerySnapshot } from 'firebase/firestore'
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  db: Firestore;
  notesCol: CollectionReference<DocumentData>;
  private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();
  protected dbName = 'notes';
  obsr_UpdatedSnapshot = this.updatedSnapshot.asObservable();

  constructor() {
    initializeApp(environment.firebase);
    this.db = getFirestore();
    this.notesCol = collection(this.db, this.dbName);

    // Get Realtime Data
    onSnapshot(this.notesCol, (snapshot) => {
      this.updatedSnapshot.next(snapshot);
    }, (err) => {
      console.log(err);
    })
  }

  async getNotes() {
    const snapshot = await getDocs(this.notesCol);
    return snapshot;
  }

  async addNote(title: string, description: string) {
    await addDoc(this.notesCol, {
      title,
      description
    })
    return;
  }

  async deleteNote(docId: string) {
    const docRef = doc(this.db, this.dbName, docId)
    await deleteDoc(docRef);
    return;
  }

  async updateNote(id: string, title?: string, description?: string) {
    const docRef = doc(this.db, this.dbName, id);
    await updateDoc(docRef, { title, description })
    return;
  }
}
