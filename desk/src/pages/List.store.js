import Vue from 'vue';
import frappe from '../frappe';

export default {
    namespaced: true,
    state: {
        DocType: null
    },
    getters: {
        getData: state => doctype => state[doctype]
    },
    mutations: {
        setData(state, { doctype, listData }) {
            Vue.set(state, doctype, listData)
        }
    },
    actions: {
        async fetchData({ commit }, { doctype, fields, filters, start, pageLength, orderBy }) {
            const data = await frappe.call('frappe.desk.reportview.get', {
                doctype,
                fields,
                filters,
                with_comment_count: true,
                start,
                page_length: pageLength,
                order_by: orderBy
            });
            if (data.values && data.values.length > 0) {
                commit('setData', {
                    doctype,
                    listData: convertToKeyValue(data.keys, data.values)
                })
            }
        },

    }
}

function convertToKeyValue(keys, values) {
    return values.map((row) => {
        return row.reduce((acc, cell, i) => {
            acc[keys[i]] = cell;
            return acc;
        }, {});
    });
}