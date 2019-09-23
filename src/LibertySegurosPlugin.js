import React from 'react';

import { FlexPlugin } from 'flex-plugin';
import AgentDesktopView from './CustomAgentDesktop';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'LibertySegurosPlugin';

export default class LibertySegurosPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);


      // flex.TaskInfoPanel.Content.remove("container");
      // flex.TaskInfoPanel.Content.add(<TaskInfoPanel key="custom_info" />);

      // Keys from https://www.twilio.com/docs/flex/localization-and-ui-templating
      flex.Manager.getInstance().strings = Object.assign(flex.Manager.getInstance().strings, {
        TaskFilterAll: 'todas las tareas',
        TaskHeaderEndChat: 'Chat finalizado',
        TaskTabAgentInfoLabel: 'informacion',
        TaskTabAgentChatLabel: 'charla',
        TaskTabAgentCallLabel: 'llamada',
        InputPlaceHolder: 'escribir mensaje',
        TaskHeaderStatusAccepted: 'Activo | {{helper.durationSinceUpdate}}',
        ChatWelcomeText: 'La conversación comenzó con el cliente.',
        LogOut: 'Cerrar sesión',
        Today: 'Hoy',
        Yesterday: 'Ayer',
        Read: 'leído'
      });

      flex.AgentDesktopView.Panel2.Content.remove("container");
      flex.AgentDesktopView.Panel2.Content.add(<AgentDesktopView key="custom-crm" />);
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    manager.store.addReducer(namespace, reducers);
  }
}
