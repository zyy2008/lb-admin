<template>
<div id="app">
    <div class="amap-wrapper">
      <el-amap
        vid="amapDemo"  
        :center="center"
        :zoom="zoom"  
        :events="events"
        class="amap-demo">
        <el-amap-marker v-for="marker in markers" :position="marker.position" :content="marker.content" :events="marker.events"></el-amap-marker>
        <el-amap-info-window   v-if="window" :position="window.position" :visible="window.visible" :content="window.content" :offset=[0,-28] ></el-amap-info-window>
      </el-amap>
    </div>
     <el-button @click="addMarker">增加</el-button>
  </div>
</template>

<script>
import { fetchList } from "@/api/article";

export default {
  data() {
    let self = this;
    return {
      zoom: 16,
      center: [121.59996, 31.197646],
      markers: [],
      windows: [],
      window: "",
      markerRefs: [],
      events: {
        init(map) {
          setTimeout(() => {
           new AMap.MarkerClusterer(map, self.markerRefs,{
              gridSize: 200
            });
          }, 1000);
        }
      }
    }
  },
  mounted() {
    let markers = [];
    let windows = [];

    let num = 600;
    let self = this;

    for (let i = 0; i < num; i++) {
      markers.push({
        position: points[i]["lnglat"],
        content: '<div style="text-align:center; background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
        events: {
          init(o) {
            self.markerRefs.push(o)
          },
          mousemove() {
              self.windows.forEach(window => {
                window.visible = false;
              });

              self.window = self.windows[i];
              self.$nextTick(() => {
                self.window.visible = true;
              });
            }
        }
      })

      windows.push({
        position: points[i]["lnglat"],
        content: `<div class="prompt">${i}</div>`,
        visible: false
      });
    }

    this.markers = markers;
    this.windows = windows;
  },
  methods: {
    addMarker() {
      let marker = {
        position: [
          121.5273285 + (Math.random() - 0.5) * 0.02,
          31.21515044 + (Math.random() - 0.5) * 0.02
        ]
      };
      this.markers.push(marker);
    }
  }
};
</script>
<style>
.amap-wrapper {
  width: 100%;
  height: 600px;
}
</style>
