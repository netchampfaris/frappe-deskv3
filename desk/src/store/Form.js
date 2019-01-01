import Vue from 'vue'
import frappe from '../frappe'

export default {
    namespaced: true,
    state: {
        docs: {}
    },
    getters: {
        getDoc: state => (doctype, name) => {
            if (!state.docs[doctype]) return null
            return state.docs[doctype][name] || null
        },
    },
    mutations: {
        setDoc(state, { doc }) {
            if (!state.docs[doc.doctype]) {
                Vue.set(state.docs, doc.doctype, {})
            }
            Vue.set(state.docs[doc.doctype], doc.name, doc)
        },
        setValue(state, { doctype, name, fieldname, value }) {
            if (state.docs[doctype] && state.docs[doctype][name]) {
                state.docs[doctype][name][fieldname] = value
                Vue.set(state.docs[doctype][name], '__dirty', true)
            }
        },
        setDocAsClean(state, { doctype, name }) {
            Vue.set(state.docs[doctype][name], '__dirty', false)
        }
    },
    actions: {
        async fetchDoc(context, { doctype, name }) {
            let doc = context.getters.getDoc(doctype, name);
            if (doc) return doc;

            doc = await frappe.call('frappe.client.get', { doctype, name })
            if (doc) {
                context.commit('setDoc', { doc })
            }
            return doc
        },
        async saveDoc(context, { doctype, name }) {
            let doc = context.getters.getDoc(doctype, name);
            if (!doc) {
                console.warn('Doc not found') //eslint-disable-line
                return
            }

            let data = await frappe.call('frappe.desk.form.save.savedocs', {
                doc: JSON.stringify(doc),
                action: 'Save'
            })
            console.log(data); //eslint-disable-line

            context.commit('setDocAsClean', doc)
        }
    }
}
