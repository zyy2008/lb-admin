<template>
  <div>
    <svg t="1492500959545" @click="toggleClick" class="hamburger" :class="{'is-active':isActive}" style="" viewBox="438.651 389.297 295.979 295.982"
      version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64" fill="#999999">
     <path d="M469.641,431.285h234c6.05,0,11-4.95,11-11v0c0-6.05-4.95-11-11-11h-234c-6.05,0-11,4.95-11,11v0
		C458.641,426.335,463.591,431.285,469.641,431.285z"/>
	<path d="M703.624,643.286h-234c-6.05,0-11,4.95-11,11v0c0,6.05,4.95,11,11,11h234c6.05,0,11-4.95,11-11v0
		C714.624,648.236,709.674,643.286,703.624,643.286z"/>
	<path d="M563.961,548.286h139.663c6.05,0,11-4.95,11-11s-4.95-11-11-11H563.961c-6.05,0-11,4.95-11,11
		S557.911,548.286,563.961,548.286z"/>
	<path d="M529.21,612.62l-67.361-67.361c-4.278-4.278-4.278-11.278,0-15.556h0c0.029-0.029,0.06-0.052,0.089-0.081l67.289-67.289
		c4.278-4.278,11.278-4.278,15.556,0h0c4.278,4.278,4.278,11.278,0,15.556l-59.596,59.596l59.578,59.578
		c4.278,4.278,4.278,11.278,0,15.556v0C540.488,616.898,533.488,616.898,529.21,612.62z"/>
      
    </svg>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  transform: rotate(180deg);
  transition: .38s;
  transform-origin: 50% 50%;
}

.hamburger.is-active {
  transform: rotate(0deg);
}
</style>
