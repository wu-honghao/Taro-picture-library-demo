import * as Vuex from "vuex";
import Taro from '@tarojs/taro'
// 创建一个新的 store 实例
const store = Vuex.createStore({
    state() {
        return {
            pictures: [],
            collectPhotos: [],
            page: 1,
            isHasPhotos: true,
            photoAmount: 0
        }
    },
    mutations: {
        LOAD_PICTURE_MUTATIONS: (state, pictures) => {
            state.pictures.push(pictures)
        },
        toCollect: (state, pictures) => {
            state.collectPhotos.push(pictures)
        },
        cancelCollect: (state, idx) => {
            state.collectPhotos.splice(idx, 1);
        },
        loadingAll: (state, data) => {
            state.pictures = data[0]
            state.collectPhotos = data[1]
            state.page = data[2]
            state.isHasPhotos = data[3]
            state.photoAmount = data[4]
            console.log(state.pictures)
        }
    },
    actions: {
        LOAD_PICTURE_MUTATIONS: async(context, { page = 1, limit = 12 }) => {
            const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
            const res = await Taro.request({ url })
            for (var i = 0; i < res.data.length; i++) {
                res.data[i].isCollect = false
                res.data[i].idx = store.state.photoAmount
                store.state.photoAmount = store.state.photoAmount + 1;
                console.log(store.state.photoAmount)
                context.commit("LOAD_PICTURE_MUTATIONS", res.data[i])
            }
            return res.data
        }
    }
})

export default store