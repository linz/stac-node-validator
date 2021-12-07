const app = require('../index');

let consoleErrSpy, consoleWarnSpy, consoleInfSpy, consoleLogSpy, mockExit;
const initString = 'STAC Node Validator v1.1.0';

beforeEach(() => {
	mockExit = jest.spyOn(process, 'exit').mockImplementation();
	consoleInfSpy = jest.spyOn(console, 'info').mockImplementation();
	consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
	consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
	consoleErrSpy = jest.spyOn(console, 'error').mockImplementation();
});

it('Should print init string', async () => {
	await app();

	expect(consoleLogSpy.mock.calls[0][0]).toContain(initString);
});

describe('Running without parameters or configuration', () => {
	it('Should return exit code 1', async () => {
		await app();
		expect(mockExit).toHaveBeenCalledWith(1);
	});

	it('Should print an error message', async () => {
		await app();
		expect(consoleErrSpy.mock.calls[0][0] instanceof Error).toBeTruthy();
		expect(consoleErrSpy.mock.calls[0][0].message).toContain('No path or URL specified.');
	});
});

describe('Running with a configured valid catalog', () => {
	let files = ['tests/catalog.json'];

	it('Should return exit code 0', async () => {
		await app({files});

		expect(mockExit).toHaveBeenCalledWith(0);
	});

	it('Should print informational messages', async () => {
		await app({files});

		expect(consoleLogSpy.mock.calls[0][0]).toContain(initString);
		expect(consoleLogSpy.mock.calls[1][0]).toContain('tests/catalog.json');
		expect(consoleInfSpy.mock.calls[0][0]).toContain('Files: 1');
		expect(consoleInfSpy.mock.calls[1][0]).toContain('Valid: 1');
		expect(consoleInfSpy.mock.calls[2][0]).toContain('Invalid: 0');
	});

	it('Should not print a critical error message', async () => {
		await app({files});

		expect(consoleErrSpy).not.toHaveBeenCalled();
	});
});

describe('Running with a configured invalid catalog', () => {
	let files = ['tests/invalid-catalog.json'];
	it('Should return exit code 1', async () => {
		await app({files});

		expect(mockExit).toHaveBeenCalledWith(1);
	});

	it('Should print informational messages', async () => {
		await app({files});

		expect(consoleLogSpy.mock.calls[0][0]).toContain(initString);
		expect(consoleLogSpy.mock.calls[1][0]).toContain('tests/invalid-catalog.json');
		expect(consoleInfSpy.mock.calls[0][0]).toContain('Files: 1');
		expect(consoleInfSpy.mock.calls[1][0]).toContain('Valid: 0');
		expect(consoleInfSpy.mock.calls[2][0]).toContain('Invalid: 1');
	});

	it('Should print validation warnings', async () => {
		await app({files});

		console.log(consoleWarnSpy);

		expect(consoleWarnSpy.mock.calls[0][0]).toEqual([{
			"instancePath": "",
			"keyword": "required",
			"message": "must have required property 'links'",
			"params": {"missingProperty": "links"},
			"schemaPath": "#/required"
		}]);
	});

	it('Should not print a critical error message', async () => {
		await app({files});

		expect(consoleErrSpy).not.toHaveBeenCalled();
	});
});

afterEach(() => {
	mockExit.mockClear();
	consoleInfSpy.mockClear();
	consoleLogSpy.mockClear();
	consoleErrSpy.mockClear();
});

afterAll(() => {
	mockExit.mockRestore();
	consoleInfSpy.mockRestore();
	consoleLogSpy.mockRestore();
	consoleErrSpy.mockRestore();
});
