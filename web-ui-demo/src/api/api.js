import * as order from './modules/order';
import * as user from './modules/user';
import * as basedata from './modules/basedata';
import * as fleet from './modules/fleet';
import * as website from './modules/website';
import * as dispatch from './modules/dispatch';
import * as logistics from './modules/logistics';
import sys from './modules/sys';
import * as settlement from './modules/settlement';
import * as customer from './modules/customer'
import * as evaluate from './modules/evaluate'
import * as external from './modules/external'


export default {
    ...order,
    ...user,
    ...basedata,
    ...dispatch,
    ...logistics,
    ...settlement,
    sys,
    ...fleet,
  ...website,
    ...customer,
    ...evaluate,
    ...external,
};
