import * as React from "react"
import { Button, Callout, Flyout, Input, Layout } from "../../components"
import { copyToClipboard, downloadAsFile } from "../../utils"
import "./tests_report_template.css"

const defaultBrowsers = ["Chrome", "Edge", "Firefox", "Safari"]
const preselectedBrowsers = ["Chrome", "Firefox", "Safari"]
const defaultTest = {title: "", url: "", type: "ui", browsers: [], results: []}
const defaultTestTypes = [
    {
        label: "UI",
        value: "ui"
    },
    {
        label: "Backend",
        value: "backend"
    },
    {
        label: "Other",
        value: "other"
    }
]
const testResults = [
    {
        emoji_markdown: ":black_circle:",
        label: "⚫ None",
        value: "none",
    },
    {
        emoji_markdown: ":green_circle:",
        label: "🟢 Pass",
        value: "pass"
    },
    {
        emoji_markdown: ":yellow_circle:",
        label: "🟡 Warning",
        value: "warning"
    },
    {
        emoji_markdown: ":red_circle:",
        label: "🔴 Fail",
        value: "fail"
    },
    {
        emoji_markdown: ":white_circle:",
        label: "⚪ Not applicable",
        value: "not applicable"
    }
]

const defaultTestResult = "none"

const issueResultEmoji = {
    3: ':white_circle:',
    2: ':yellow_circle:',
    1: ':green_circle:',
    0: ':black_circle:',
    [-1]: ':red_circle:',
}

const initialState = {
    globalTestSuite: "Wazuh dashboard",
    globalBrowsers: [...preselectedBrowsers],
    options: { ["test.status.enabled"]: false},
    tests: [{...defaultTest, browsers: [...preselectedBrowsers]}],
    type: "ui",
}

const pageTips = [
    {
        type: "info",
        message: <>
            <strong>Info:</strong> All the tests must have a title to export or view the output.
        </>
    },
    {
        type: "info",
        message: <>
            <strong>Info:</strong> The output will classify of types of tests.
        </>
    },
    {
        type: "info",
        message: <>
            <strong>Info:</strong> <code>browsers</code> URL parameter can be used to set the preselected browsers for new tests. Allowed values: {defaultBrowsers.map(defaultBrowser => defaultBrowser.toLowerCase()). join(', ')}. Multiple browsers can be defined using the , separator.
            Example: browsers=chrome,firefox
        </>
    },
    {
        type: "info",
        message: <>
            <strong>Info:</strong> <code>type</code> URL parameter can be used to set the preselected type for new tests. Allowed values: {defaultTestTypes.map(({value}) => value). join(', ')}.
            Example: type=backend
        </>
    }
]

export default function TestReportTemplate({ location }) {
    const [globalTestSuite, setPluginPlatform] = React.useState(initialState.globalTestSuite)
    const [globalBrowsers, setGlobalBrowsers] = React.useState([...initialState.globalBrowsers])
    const [testType, setTestType] = React.useState(defaultTestTypes[0].value)
    const [tests, setTests] = React.useState([...initialState.tests])
    const [options, setOptions] = React.useState({...initialState.options})
    const [flyoutOpened, setFlyoutOpened] = React.useState(false)

    React.useEffect(() => {
        setStateFromURLParameters(location, {globalBrowsers: setGlobalBrowsers, testType: setTestType, tests: setTests, options: setOptions}, {type: initialState.type, browsers: [...initialState.globalBrowsers]})
    },[])

    const addNewTestToForm = () => setTests([...tests, createNewTestCase({type: testType, browsers: [...globalBrowsers]})])

    const onChangeInput = (property, index, value) => {
        tests[index][property] = value
        setTests([...tests])
    }

    const onChangeCaseType = (property, index, value) => {
        tests[index][property] = value
        tests[index]["results"] = getResults(value)
        setTests([...tests])
    }

    const removeTest = (index) => {
        tests.splice(index, 1)
        setTests([...tests])
    }

    const onChangeBrowserCreator = (browser, currentValue, setter) => {
        return function(event){
            const selectedBrowsers = new Set(currentValue)
            if(event.target.checked){
                selectedBrowsers.add(browser)
            }else{
                if(selectedBrowsers.size > 1){
                    selectedBrowsers.delete(browser)
                }
            }
            setter([...selectedBrowsers].sort())
        }
    }

    const onChangeCheckboxCreator = (setter) => {
        return function(event){
            setter(event.target.checked)
        }
    }

    const onChangeTestResultCreator = (indexTestResult, index) => (event) => {
        tests[index]["results"][indexTestResult] = {...tests[index]["results"][indexTestResult], result: event.target.value}
        setTests([...tests])
    }

    const onChangeOptionsCreator = (key) => (event) => {
        const value = event.target.checked
        setOptions({...options, [key]: value})
    }

    const reset = () => {
        setPluginPlatform(initialState.globalTestSuite)
        const [globalBrowsersParam, testTypeParam, optionsTestResultEnabled] = getParametersFromURL(location, ["browsers", "type", "option-test-result-enabled"])

        if(globalBrowsersParam){
            const selectedGlobalBrowsers = transformGlobalBrowsersParameter(globalBrowsersParam)
            setGlobalBrowsers(selectedGlobalBrowsers)
        }else{
            setGlobalBrowsers([...initialState.globalBrowsers])
        }

        if(testTypeParam){
            defaultTestTypes.find(({value}) => value === testTypeParam) && setTestType(testTypeParam)
        }else{
            setTestType(defaultTestTypes[0].value)
        }

        if(typeof optionsTestResultEnabled !== "undefined"){
            setOptions({
                ...options,
                ["test.status.enabled"]: Boolean(optionsTestResultEnabled)
            })
        }else{
            setOptions({
                ...options,
                ["test.status.enabled"]: Boolean(initialState.options["test.status.enabled"])
            })
        }

        //TODO: fix browser using URL parameter
        setTests([...initialState.tests.map(test => ({...test, results: getResults(test.type)}))])
    }

    const generatedText = exportToGitHubMarkdown({
        globalTestSuite,
        globalBrowsers,
        options,
        tests,
    })

    const disabledExportButtons = !tests.every(({title}) => title)

    return (
      <Layout>
        {flyoutOpened && (
            <Flyout
                onClose={() => setFlyoutOpened(false)}
            >
                <div className="mb-s">
                    <div className="mb-s">Tips</div>
                    {pageTips.map(({type, message}) => (
                        <Callout type={type} className="mb-s">
                            {message}
                        </Callout>
                    ))}
                </div>
            </Flyout>
        )}
        <div className="mb-s" style={{display: "flex", justifyContent: "flexEnd"}}>
            {/* <div className="mx-m d-flex" style={{gap: "10px", flexWrap: "wrap"}}>
                
            </div> */}
            <div className="mx-m d-flex" style={{gap: "10px", flexWrap: "wrap"}}>
                <span className="mx-xs">
                    <label className="button" for="import-file" style={{display: "block"}}>Import JSON file</label>
                    <Input
                        type="file"
                        id="import-file"
                        name="import-file"
                        accept="application/json"
                        onChange={async (event) => {
                            try{
                                const file = event.target.files.item(0)
                                const text = await file.text()
                                const data = JSON.parse(text)
                                data.globalTestSuite && setPluginPlatform(data.globalTestSuite)
                                data.globalBrowsers && setGlobalBrowsers(data.globalBrowsers)
                                data.tests && data.tests.length && setTests(data.tests)
                                data.options && setOptions(data.options)
                            }catch(error){
                                console.error(error)
                            }
                        }}
                    />
                </span>
                <span className="mx-xs">
                    <Button
                        onClick={reset}
                        title="Reset to the default values"
                    >
                        Reset
                    </Button>
                    
                </span>
                <span className="mx-xs">
                    <Button
                        onClick={() => setFlyoutOpened((open) => !open)}
                        title="See tips"
                    >
                        Tips
                    </Button>
                </span>
                <span className="mx-xs">
                    <Button
                        disabled={disabledExportButtons}
                        onClick={() => console.log(generatedText)}
                    >
                        View Markdown text in browser console (See in the browser dev tools)
                    </Button>
                </span>
                <span className="mx-xs">
                    <Button
                        disabled={disabledExportButtons}
                        onClick={() => copyToClipboard(generatedText)}
                    >
                        Copy to clipboard
                    </Button>
                    
                </span>
                <span className="mx-xs">
                    <Button
                        disabled={disabledExportButtons}
                        onClick={() => downloadAsFile(generatedText, "text/plain", "tests.md")}
                    >
                        Export to Markdown file
                    </Button>
                </span>
                <span className="mx-xs">
                    <Button
                        disabled={disabledExportButtons}
                        onClick={() => downloadAsFile(JSON.stringify({globalTestSuite, options, tests}, null, 2), "application/json", "tests.json")}
                    >
                        Export to JSON file
                    </Button>
                </span>         
            </div>
        </div>
        <div className="mb-l">
            <div className="mb-s">
                <div className="mb-s d-flex" style={{gap: "10px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between"}}>
                    <div>
                        <label className="mr-s" for="test_suite">Tests suite</label>
                        <Input type="text" id="test_suite" name="test_suite" value={globalTestSuite} onChange={(event) => setPluginPlatform(event.target.value)}/>
                    </div>
                    <div>
                        <div>Options</div>
                        <label className="mr-s" for="options-test.status.enabled" title="Enable the test status">test.status.enabled</label>
                        <Input type="checkbox" id={"options-test.status.enabled"} name={"options-test.status.enabled"} checked={options["test.status.enabled"]} onChange={onChangeOptionsCreator("test.status.enabled")}/>
                    </div>
                    <div>
                        <div>Preselected options for new tests</div>
                        <div className="d-flex" style={{gap: "10px", flexWrap: "wrap", alignItems: "center"}}>
                            <div>
                                <fieldset style={{display: "inline"}}>
                                    <legend>Type</legend>
                                        {defaultTestTypes.map(({label, value}) => (
                                            <div key={`test_type-${label}`}>
                                                <label for={`test_type-${label}`}>{label}</label>
                                                <Input type="radio" id={`test_type-${label}`} name={`test_type`} checked={value === testType} onChange={(event) => setTestType(value)}/>
                                            </div>

                                        ))}
                                </fieldset>
                            </div>
                            <div>
                                <fieldset style={{display: "inline"}}>
                                    <legend>Browsers</legend>
                                    {defaultBrowsers.map(defaultBrowser => {
                                        const idBrowser = `form:browser:${defaultBrowser}`
                                        return (
                                            <div key={idBrowser}>
                                                <label for={idBrowser}>{defaultBrowser}</label>
                                                <Input type="checkbox" id={idBrowser} name={idBrowser} checked={globalBrowsers.includes(defaultBrowser)} onChange={onChangeBrowserCreator(defaultBrowser, globalBrowsers, setGlobalBrowsers)}/>
                                            </div>
                                        )
                                    })}
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="mb-s" style={{ display: "flex", gap: "10px", flexWrap: "wrap"}}>
                {tests.map(({title, url, type, browsers, results}, index) => (
                    <div key={`card card-test-${type}-${index}`} className={`card card-test-${type}`}>
                        <div className="mb-s" style={{display: "flex", justifyContent: "space-between"}}>
                            <span className="mr-s">Case #{index + 1}</span>
                            {tests.length > 1 && (
                                <span
                                    className="cursor-pointer"
                                    onClick={() =>  removeTest(index)}
                                >
                                    ✖
                                </span>
                            )}
                        </div>
                        <div className="mb-s">
                            <label for={`test_title-${index}`} className="d-block">Title</label>
                            <textarea placeholder="Title" id={`test_title-${index}`} name={`test_title-${index}`} rows="1" value={title} style={{ minWidth: "400px", maxWidth: "94vw"}} onChange={(event) => onChangeInput("title", index, event.target.value)}/>
                        </div>
                        <div className="mb-s">
                            <label for={`test_url-${index}`} className="d-block">URL</label>
                            <Input type="text" placeholder="Issue/Pull request URL" id={`test_url-${index}`} name={`test_url-${index}`} value={url} style={{ minWidth: "400px"}} onChange={(event) => onChangeInput("url", index, event.target.value)}/>
                        </div>
                        <div className="mb-s d-flex">
                            <div>
                                <fieldset style={{display: "inline"}}>
                                    <legend>Type</legend>
                                    {defaultTestTypes.map(({label, value}) => (
                                        <div key={`test_type-${index}-${label}`}>
                                            <label for={`test_type-${index}-${label}`}>{label}</label>
                                            <Input type="radio" id={`test_type-${index}-${label}`} name={`test_type-${index}`} checked={type === value} onChange={onChangeCheckboxCreator(() => onChangeCaseType("type", index, value))}/>
                                        </div>

                                    ))}
                                </fieldset> 
                            </div>
                            {type === "ui" && (
                                <div>
                                    <fieldset style={{display: "inline"}}>
                                        <legend>Browsers</legend>
                                        {defaultBrowsers.map(defaultBrowser => {
                                            const idBrowser = `test_browser_${index}-${defaultBrowser}`
                                            return (
                                                <div key={idBrowser}>
                                                    <label for={idBrowser}>{defaultBrowser}</label>
                                                    <Input type="checkbox" id={idBrowser} name={`test_browser_${index}`} checked={browsers.includes(defaultBrowser)} onChange={onChangeBrowserCreator(defaultBrowser, browsers, (val) => onChangeInput("browsers", index, val))}/>
                                                </div>
                                            )
                                        })}
                                    </fieldset>
                                </div>
                            )}
                            {options["test.status.enabled"] && (
                                <div>
                                    <fieldset style={{display: "inline"}}>
                                        <legend>Test results</legend>
                                        {results.map(({label, result}, indexTestResult) => {
                                            const key = `test_browser_result-${index}-${indexTestResult}-${label}`
                                            return (
                                                <div className="my-s" key={key}>
                                                    <label className="mr-s" for={key}>{label}</label>
                                                    <select id={key} name={`test_browser_${index}`} disabled={type === "ui" && !browsers.includes(label)} value={result} onChange={onChangeTestResultCreator(indexTestResult, index)}>
                                                        {testResults.map(({label, value}) => <option value={value} key={`${key}-${label}`}>{label}</option>)}
                                                    </select>
                                                </div>
                                            )
                                        })}                                              
                                    </fieldset>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="mb-s" style={{position: "fixed", bottom: "10px", right: "10px"}}>
            <div>
                <Button onClick={addNewTestToForm}>Add new test</Button>
            </div>
        </div>
      </Layout>
    )
}

function exportToGitHubMarkdown(data){
/*
  Utility to generate the result of a test suite in Markdown
*/


// Logging
function main({globalTestSuite, tests, options}){

    const uiTests = tests.filter(({type}) => type === "ui")
    const backendTests = tests.filter(({type}) => type === "backend")
    const otherTests = tests.filter(({type}) => type === "other")

    const uiTestsBrowsers = (function(uiTests){
        const browsersSet = new Set();
        uiTests.forEach(({browsers}) => {
            browsers.forEach(browser => browsersSet.add(browser))
        })
        return [...browsersSet].sort()
    })(uiTests)

    return `# ${globalTestSuite}

Legend:
${testResults.map(({emoji_markdown, value}) => `${emoji_markdown}: ${value}`).join('\n')}

${uiTests.length ? `## UI

| Test |${uiTestsBrowsers.map(browser => ` ${browser} |`).join('')}
| --- | ${uiTestsBrowsers.map(() => ` --- |`).join('')}
${uiTests.map(({ title, url, browsers, results }) => `| ${url ? `[${title}](${url})`: title} |${uiTestsBrowsers.map((uiTestsBrowser) => browsers.includes(uiTestsBrowser) ? ` ${transformTestResultToMarkdown(results.find(({label}) => label === uiTestsBrowser).result, options["test.status.enabled"])} |` : ` ${getTestResultToMarkdown("not applicable")} |`).join('')}`).join('\n')}

**Details**
${uiTests.map(({ title, url, browsers, results }) => {
    return `<details>
<summary>${getTestResultToMarkdown()} ${url ? `<a href="${url}" target="_blank">${title}</a>` : title}</summary>
${browsers.map((browser) => `
${browser} - ${transformTestResultToMarkdown(results.find(({label}) => label === browser).result, options["test.status.enabled"])}`).join('\n')}

</details>`}).join('\n\n')}
`: ''}
${backendTests.length ? `## Backend

| Test | Result |
| --- |  --- |
${backendTests.map(({ title, url, results }) => `| ${url ? `[${title}](${url})`: title} | ${transformTestResultToMarkdown(results[0].result, options["test.status.enabled"])} |`).join('\n')}

**Details**
${backendTests.map(({ title, url, results }) => {
    return `<details>
<summary>${transformTestResultToMarkdown(results[0].result, options["test.status.enabled"])} ${url ? `<a href="${url}" target="_blank">${title}</a>` : title}</summary>

</details>`}).join('\n\n')}
`: ''}
${otherTests.length ? `## Other

| Test | Result |
| --- |  --- |
${otherTests.map(({ title, url, results }) => `| ${url ? `[${title}](${url})`: title} | ${transformTestResultToMarkdown(results[0].result, options["test.status.enabled"])} |`).join('\n')}

**Details**
${otherTests.map(({ title, url, results }) => {
    return `<details>
<summary>${transformTestResultToMarkdown(results[0].result, options["test.status.enabled"])} ${url ? `<a href="${url}" target="_blank">${title}</a>` : title}</summary>

</details>`}).join('\n\n')}
`: ''}`
    
}

    try{
        return main(data)
    }catch(error){
        console.log(error)
    }
}

function setStateFromURLParameters(location, setters, defaults){
    const [globalBrowsersParam, testTypeParam, optionsTestResultEnabled]  = getParametersFromURL(location, ["browsers", "type", "option-test-result-enabled"])
    
    let customBrowsers, customType
    if(globalBrowsersParam){
        const selectedGlobalBrowsers = transformGlobalBrowsersParameter(globalBrowsersParam)
        if(globalBrowsersParam.length){
            setters.globalBrowsers(selectedGlobalBrowsers)
            customBrowsers = [...selectedGlobalBrowsers]
        }
    }
    if(testTypeParam){
        if(defaultTestTypes.find(({value}) => value === testTypeParam)){
            setters.testType(testTypeParam)
            customType = testTypeParam
        }
    }
    if(typeof optionsTestResultEnabled !== "undefined"){
        setters.options({
            ...initialState.options,
            ["test.status.enabled"]: Boolean(optionsTestResultEnabled)
        })
    }else{
        setters.options({
            ...initialState.options,
            ["test.status.enabled"]: Boolean(initialState.options["test.status.enabled"])
        })
    }

    setters.tests([createNewTestCase({
        type: testTypeParam || defaults.type,
        browsers: customBrowsers || defaults.browsers
    })])
}

function getParametersFromURL(location, parameters){
    const urlParameters = new URLSearchParams(location.search)
    return parameters.map((parameter) => urlParameters.get(parameter))
}

function transformGlobalBrowsersParameter(value){
    return value.split(',').reduce((accum, val ) => [
        ...accum,
        ...([defaultBrowsers.find(defaultBrowser => val.toLowerCase() === defaultBrowser.toLowerCase())])
    ], []).filter(val => val).sort()
}

function createNewTestCase({type, browsers}){
    return {title: "", url: "", type: type, browsers: [...browsers], results: getResults(type)}
}

function getResults(type){
    if(type === "ui"){
        return defaultBrowsers.map(defaultBrowser => ({label: defaultBrowser, result: defaultTestResult}))
    }else{
        return [{label: "Result", result: defaultTestResult}]
    }
}

function transformTestResultToMarkdown(resultTest, useResult){
    return useResult
        ? testResults.find(({value}) => value === resultTest).emoji_markdown
        : getTestResultToMarkdown()
}

function getTestResultToMarkdown(result = defaultTestResult){
    return testResults.find(({value}) => value === result).emoji_markdown
}