import React from 'react';
import S from './Layout.module.css';
import Panel from "../common/panel/Panel";
import ListPanel from '../panels/list/List';
import InputField from '../common/field/input-field/InputField';

/**
 * @function Layout
 * @description The general layout of the web app
 * @author J. Trpka
 * @returns {JSX.Element}
 */
const Layout = () => {
    const [sample, setSample] = React.useState('');

    console.info(sample);

    return (
        <main className={S.layout}>
            <ListPanel />

            <Panel>
                <h1>Sandbox</h1>

                <InputField id={'sample'}>
                    <InputField.Label>Sample</InputField.Label>
                    <InputField.Input
                        type="datetime-local"
                        name="sample"
                        value={sample}
                        onChange={(e) => setSample(e.target.value)} 
                    />
                </InputField>
            </Panel>
        </main>
    );
};

export default Layout;