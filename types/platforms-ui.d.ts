import Vue from 'vue'
import { PlatformsComponent } from './component'

import { PlAlert } from './alert'

export type Component = PlatformsComponent
export function install (vue: typeof Vue): void

export class Alert extends PlAlert {}
