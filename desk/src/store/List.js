import Vue from 'vue';
import frappe from '../frappe';

export default {
    namespaced: true,
    state: {
        DocType: {
            data: [],
            filters: [],
            orderBy: 'modified desc',
            start: 0,
            pageLength: 20
        }
    },
    getters: {
        getListData: state => doctype => state[doctype]
    },
    mutations: {
        setData(state, { doctype, data }) {
            state[doctype].data = data;
        },
        setListData(state, { doctype }) {
            Vue.set(state, doctype, {
                data: [],
                filters: [],
                orderBy: 'modified desc',
                start: 0,
                pageLength: 20
            })
        },
        setFilters(state, { doctype, filters }) {
            state[doctype].filters = filters.map(filter => {
                let { field, operator, value } = filter
                if (operator.includes('like') && !(value.startsWith('%') || value.endsWith('%'))) {
                    value = '%' + value + '%'
                }
                return [field.fieldname, operator, value]
            })
        }
    },
    actions: {
        async fetchData({ commit, getters, rootGetters }, { doctype }) {
            const listData = getters.getListData(doctype);
            const meta = rootGetters['Meta/getMeta'](doctype);
            const fields = getFieldsToFetch(meta);
            const data = await frappe.call('frappe.desk.reportview.get', {
                doctype,
                fields,
                filters: listData.filters,
                start: listData.start,
                page_length: listData.pageLength,
                order_by: listData.orderBy,
                with_comment_count: true,
            });

            if (data.values && data.values.length > 0) {
                commit('setData', {
                    doctype,
                    data: convertToKeyValue(data.keys, data.values)
                })
            } else {
                commit('setData', { doctype, data: [] })
            }
        },

        async applyFilter({ commit, dispatch }, { doctype, filters }) {
            commit('setFilters', { doctype, filters })
            return dispatch('fetchData', { doctype })
        }
    }
}

function getFieldsToFetch(meta) {
    let fields = ['name', '_comments', '_assign', '_seen'];
    fields.push(meta.title_field);

    let fieldsInListView = meta.fields.filter(df => df.in_list_view);
    fields.push(...fieldsInListView.map(df => df.fieldname));

    return fields.filter(Boolean);
}

function convertToKeyValue(keys, values) {
    return values.map((row) => {
        return row.reduce((acc, cell, i) => {
            acc[keys[i]] = cell;
            return acc;
        }, {});
    });
}